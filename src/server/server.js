const express = require('express');
const bodyParser = require('body-parser');
const dbController = require('./controllers/dbController');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../../dist`));

app.post('/queryDatabase', dbController.getSchemaInfo, (req, res) => {
  res.json(res.locals.schemaInfo);
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
});
