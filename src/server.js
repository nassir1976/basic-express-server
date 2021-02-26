'use strict';
const express = require('express') // this points to package.json
const app = express();
const logger = require('../src/middleware/logger.js');
// const validator = require('../src/midleware/validator.js');
const errorsFound = require('./error-handlers/500.js');
const routeNotFound = require('./error-handlers/404.js');

// global -> app level middleware

app.use(express.json());
app.use(logger);

// build out routes -> with querystring & request parameter
app.get('/person', logger, (req, res, next) => {
  let resObject = {
    name: req.query.name
  }
  res.status(200).json(resObject)
})
// ===========error-handlers==========

app.use('*', routeNotFound);
app.use(errorsFound);

// module has an object  has a property like  server,start ...
module.exports = {
    server: app,
    //start:start
    start: port => { // another way of making server listien
      app.listen(port, () => {
        console.log(`listeining:${port}`);
      })
    }
  }
// function start(port){
// app.listen(port,() =>{
// console.log(`listeining:${port}`);
// })
// }

