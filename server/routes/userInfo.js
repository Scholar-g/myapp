var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET userInfo listing. */
router.use((req, res, next) => {
  console.log(`路由执行成功啦~~~`, Date.now());
  next()
})

router.get('/', (req, res, next) => {
  //查询syzzl表
  db.query('SELECT * FROM syzzl', function (results, fields) {
    res.json({
      code: 2000,
      message: 'get success',
      data: results
    })
  })
})

module.exports = router;
