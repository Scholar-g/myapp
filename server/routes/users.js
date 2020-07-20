var express = require('express');
var router = express.Router();
// const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // fs.readFile( './views/index.html', 'utf8', (error, docs) => { 
  //     if (error) {
  //         console.log( error )
  //     } else {
  //         res.send(docs)
  //     }
  // })
  res.render('index.html')
});

module.exports = router;
