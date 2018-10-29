const express = require('express');
const dbController = require('./controllers/dbController');

const app = express();

app.use(express.static(`${__dirname}/../../dist`));

app.post('/queryDatabase', dbController.getSchemaInfo, (req, res) => {

});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
});
