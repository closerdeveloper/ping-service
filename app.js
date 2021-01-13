const express = require('express')
const path = require('path')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;
const app = express()

const logger = require('./log/winston');
app.use(morgan(':method :url :status :res[content-length]  - :response-time ms', { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('Whoam i !'));
app.post('/noti', (req, res) => {
    logger.info("noti  : "+JSON.stringify(req.body));
return res.send("success")
});
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send('Not Found ... closer');
});
app.listen(port, () => console.log(`express app listening at http://localhost:${port}`))