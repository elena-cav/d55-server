# d55-server

### Hosted API: https://d55-ec-test.herokuapp.com/

### Hosted frontend: https://d55-test.netlify.app/

This is an API built for an Energy Company Account Manager, serving as a tool to upload a CSV file of Customer Meter Readings and monitor the customers' energy consumption.

Built using

- Node.js (15.8.0)
- PG (v ^8.5.1")
- Express.js
- Knex.js

## Setup

- Fork this repo
- Git clone URL on your machine

### Create a knexfile.js

```json
{
const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const baseConfig = {
  client: 'pg',

  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

// only add username and password if your working from a Linux machine

const customConfig = {
  development: {
    connection: { database: 'nc_news', username: '', password: '' }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: '',
      password: ''
    }
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
}
```

- npm install
- npm setup-dbs (setup the database)
- npm seed-dev (seed the dev database)
- npm seed-test (seed the test database)
- npm t app (test the project)
