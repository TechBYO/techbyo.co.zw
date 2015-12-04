"use strict";

/**
 * Module dependencies.
 */
var config = require('../../config');
var Bookshelf = require('../lib/dbconnect')(config);
var unidecode = require('unidecode');
var bluebird = require('bluebird');
var _sanitize = require('validator').sanitize;

Bookshelf.Model = Bookshelf.Model.extend({

  initialize: function initialize() {
    var self = this;

    self.on('saving', function (model, attributes, options) {
      return self.saving(model, attributes, options);
    });
  },

  getTableName: function getTableName() {
    return this.tableName;
  },

  getJSON: function getJSON(props) {
    var self = this;
    var json = {};

    props.forEach(function (prop) {
      json[prop] = self.get(prop);
    });

    return json;
  },

  saving: function saving(newObj, attr, options) {
    var self = this;
    var table = self.tableName;

    // if is new or slug has changed and has slug field - generate new slug
    if (self.has('slug') && self.has('slug') && self.hasChanged('slug') || !self.get('slug')) {
      return self.generateSlug(self.get('slug') || self.get('name') || self.get('title')).then(function (slug) {
        self.set({ slug: slug });
      });
    }
  },

  sanitize: function sanitize(attr) {
    return _sanitize(this.get(attr)).xss();
  },

  /**
   * Credit: https://github.com/TryGhost/Ghost
   *
   * ### Generate Slug
   * Create a string to act as the permalink for an object.
   * @param {ghostBookshelf.Model} Model Model type to generate a slug for
   * @param {String} base The string for which to generate a slug, usually a title or name
   * @param {Object} options Options to pass to findOne
   * @return {Promise(String)} Resolves to a unique slug string
  */
  generateSlug: function generateSlug(base) {
    var self = this;
    var slug;
    var slugTryCount = 1;
    var baseName = self.tableName.replace(/s$/, '');

    // Look for a post with a matching slug, append an incrementing number if so
    var checkIfSlugExists;

    checkIfSlugExists = function (slugToFind) {
      var args = { slug: slugToFind };

      return self.constructor.forge(args).fetch().then(function (found) {
        var trimSpace;

        if (!found) {
          return bluebird.resolve(slugToFind);
        }

        slugTryCount += 1;

        // If this is the first time through, add the hyphen
        if (slugTryCount === 2) {
          slugToFind += '-';
        } else {
          // Otherwise, trim the number off the end
          trimSpace = -String(slugTryCount - 1).length;
          slugToFind = slugToFind.slice(0, trimSpace);
        }

        slugToFind += slugTryCount;

        return checkIfSlugExists(slugToFind);
      });
    };

    slug = base.trim();

    // Remove non ascii characters
    slug = unidecode(slug);

    // Remove URL reserved chars: `:/?#[]@!$&'()*+,;=` as well as `\%<>|^~£"`
    slug = slug.replace(/[:\/\?#\[\]@!$&'()*+,;=\\%<>\|\^~£"]/g, '')
    // Replace dots and spaces with a dash
    .replace(/(\s|\.)/g, '-')
    // Convert 2 or more dashes into a single dash
    .replace(/-+/g, '-').toLowerCase();

    // Remove trailing hyphen
    slug = slug.charAt(slug.length - 1) === '-' ? slug.substr(0, slug.length - 1) : slug;

    // Check the filtered slug doesn't match any of the reserved keywords
    slug = /^(events|edit|new|devs|meetups|devs|account|admin|blog|companies|jobs|logout|login|signin|signup|signout|register|archive|archives|category|categories|tag|tags|page|pages|post|posts|user|users|rss|feed)$/g.test(slug) ? slug + '-' + baseName : slug;

    //if slug is empty after trimming use "post"
    if (!slug) {
      slug = baseName;
    }

    // Test for duplicate slugs.
    return checkIfSlugExists(slug);
  }
});

module.exports = Bookshelf;