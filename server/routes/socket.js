var express = require('express');
var router = express.Router();
let ws = require("nodejs-websocket");

/* GET socket page. */
// router.get('/', function(req, res, next) {
//   res.send('index wxzhhdgybzhybhhclgjj');
// });
console.log("开始建立链接");
ws.createServer(function (conn) {
  conn.on("text", function (str) {
    console.log("收到的信息为", str);
    conn.send(`${str}（机器人`)
  });
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  })
}).listen(8001);
console.log("链接建立完毕");

module.exports = router;
