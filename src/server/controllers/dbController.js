
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
