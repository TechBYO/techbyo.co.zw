"use strict";

/**
 * Module dependencies.
 */
let config = require('../../config');
let Bookshelf  = require('../lib/dbconnect')(config);
let unidecode  = require('unidecode');
let bluebird  = require('bluebird');
let sanitize   = require('validator').sanitize;


Bookshelf.Model = Bookshelf.Model.extend({

  initialize: function () {
    this.on('saving', (model, attributes, options) => {
      return this.saving(model, attributes, options);
    });
  },


  getTableName: function () {
    return this.tableName;
  },


  getJSON: function (props) {
    let json = {};

    props.forEach((prop) => {
      json[prop] = this.get(prop);
    });

    return json;
  },


  saving: function (newObj, attr, options) {
    let table = this.tableName;

    // if is new or slug has changed and has slug field - generate new slug
    if(this.has('slug')) {
      if (this.hasChanged('slug') || !this.get('slug')) {
        return this.generateSlug(this.get('slug') || this.get('name') || this.get('title'))
        .then((slug) => {
          this.set({slug: slug});
        });
      }
    }
  },



  sanitize: function (attr) {
    return sanitize(this.get(attr)).xss();
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
  generateSlug: function (base) {
    let slug;
    let slugTryCount = 1;
    let baseName = this.tableName.replace(/s$/, '');

    // Look for a post with a matching slug, append an incrementing number if so
    let checkIfSlugExists;

    checkIfSlugExists = (slugToFind) => {
      let args = {slug: slugToFind};

      return this.constructor.forge(args)
        .fetch()
        .then(function (found) {
        let trimSpace;

        if (!found) {
          return bluebird.resolve(slugToFind);
        }

        slugTryCount += 1;

        // If this is the first time through, add the hyphen
        if (slugTryCount === 2) {
          slugToFind += '-';
        } else {
          // Otherwise, trim the number off the end
          trimSpace = -(String(slugTryCount - 1).length);
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
      .replace(/-+/g, '-')

      .toLowerCase();

    // Remove trailing hyphen
    slug = slug.charAt(slug.length - 1) === '-' ? slug.substr(0, slug.length - 1) : slug;

    // Check the filtered slug doesn't match any of the reserved keywords
    slug = /^(events|edit|new|devs|meetups|devs|account|admin|blog|companies|jobs|logout|login|signin|signup|signout|register|archive|archives|category|categories|tag|tags|page|pages|post|posts|user|users|rss|feed)$/g
            .test(slug) ? slug + '-' + baseName : slug;

    //if slug is empty after trimming use "post"
    if (!slug) {
      slug = baseName;
    }

    // Test for duplicate slugs.
    return checkIfSlugExists(slug);
  }
});

module.exports = Bookshelf;
