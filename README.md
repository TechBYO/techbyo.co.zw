#TechBYO

### Getting started

Requirements:
  - Node.js (v14.x)
  - MySQL
  - babel (`npm install -g babel-cli`)
  - knex (`npm install -g knex`)

  1. Clone the repo to your dev machine: `git clone git@github.com:TechBYO/techbyo.co.zw.git`
  2. Run `cd techbyo.co.zw and npm install`
  3. Update `./config/index.js` with your own details
  4. Run migrations: `knex migrate:latest`

**Note:** We would prefer that you fork the repo and only contribute via pull requests.

### Migrations

Migrations are generated using `knex` (`knex migrate:make migration_name`). 
When creating a new table it is recommended that you create a schema file inside the `schemas` directory.

### Schema API

  - `tableName` - (String) name of the new table
  - `table`     - (Object) a hash table with table columns their properties

**Schema file example:**

```javascript
module.exports.tableName = 'users';

module.exports.table = {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 254, nullable: false},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true, validations: {'isEmail': true}},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
};
```

### Contributors
  - Qawelesizwe Mlilo <qawemlilo@gmail.com>


License
-------

(MIT License)

Copyright (c) 2015 TechBYO

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
