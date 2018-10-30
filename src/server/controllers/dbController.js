<<<<<<< HEAD
const initOptions = {
  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    // console.log('Connected to database:', cp.database);
  },
  disconnect(client, dc) {
    const cp = client.connectionParameters;
    // console.log('Disconnecting from database:', cp.database);
  },
  query(e) {
    // console.log('QUERY:', e.query);
  },
  receive(data, result, e) {
    // console.log('DATA: ', data);
  },
};

const pgp = require('pg-promise')(initOptions);

const oldDb = pgp('postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk');
// const newDb = pgp(process.env.SQL_URL);
=======

let u1 = '';
let u2 = '';

//   const initOptions = {
//     // global event notification;
//     error(error, e) {
//         if (e.cn) {
//             // A connection-related error;
//             //
//             // Connections are reported back with the password hashed,
//             // for safe errors logging, without exposing passwords.
//             console.log('CN:', e.cn);
//             console.log('EVENT:', error.message || error);
//         }
//     }
// };
const pgp = require('pg-promise')({});

module.exports = {
  getSchemaInfo: (req, res) => {
>>>>>>> 9195b00d50bb6cb6bcbee9c254083d3347cd087f

// oldDb.connect()
//   .then((obj) => {
//     console.log('success'); // success, release the connection;
//   })
//   .catch((error) => {
//     console.log('ERROR:', error.message || error);
//   });

module.exports = {
  getSchemaInfo: (req, res, next) => {
    oldDb.any(
      `SELECT
        t.table_name,
        c.column_name,
        c.is_nullable,
        c.data_type,
        c.character_maximum_length,
        tc.constraint_type,
        null AS foreign_table_name,
        null AS foreign_column_name
      FROM
        information_schema.tables AS t JOIN information_schema.columns AS c
          ON t.table_name = c.table_name
        LEFT JOIN information_schema.key_column_usage AS kcu
          ON t.table_name = kcu.table_name AND c.column_name = kcu.column_name
        LEFT JOIN information_schema.table_constraints AS tc
          ON kcu.constraint_name = tc.constraint_name
        LEFT JOIN information_schema.constraint_column_usage AS ccu 
          ON tc.constraint_name = ccu.constraint_name
      WHERE table_type = 'BASE TABLE'
        AND t.table_schema = 'public'
        AND (constraint_type is null OR constraint_type <> 'FOREIGN KEY')
      UNION ALL
      SELECT
        t.table_name,
        c.column_name,
        c.is_nullable,
        c.data_type,
        c.character_maximum_length,
        tc.constraint_type,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM
        information_schema.tables AS t JOIN information_schema.columns as c
          ON t.table_name = c.table_name
        LEFT JOIN information_schema.key_column_usage as kcu
          ON t.table_name = kcu.table_name AND c.column_name = kcu.column_name
        LEFT JOIN information_schema.table_constraints as tc
          ON kcu.constraint_name = tc.constraint_name
        LEFT JOIN information_schema.constraint_column_usage AS ccu
          ON tc.constraint_name = ccu.constraint_name
      WHERE table_type = 'BASE TABLE'
        AND t.table_schema = 'public'
        AND constraint_type = 'FOREIGN KEY'
      ORDER BY table_name`,
    )
      .then((data) => {
        // success;
        res.locals.schemaInfo = data;
        return next();
      })
      .catch((error) => {
        // error;
        console.log(error);
        res.sendStatus(500); // Database error.
      });
  },
  checkUrl1: (req, res) => {
  // // using an invalid connection string:
    const db1 = pgp(req.body.test);
    db1.connect()
      .then((obj) => {
        u1 = req.body.test;
        console.log(u1, 'u1');
        res.json(u1);
        obj.done(); // success, release the connection;
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
      });
  },
  checkUrl2: (req, res) => {
  // // using an invalid connection string:
    const db2 = pgp(req.body.test);
    db2.connect()
      .then((obj) => {
        u2 = req.body.test;
        console.log(u2, 'u2');
        res.json(u2);
        obj.done(); // success, release the connection;
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
      });
  },
};
