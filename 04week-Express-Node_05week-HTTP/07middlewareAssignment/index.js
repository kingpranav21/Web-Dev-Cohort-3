//1 - Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console

const express = require("express");
const app = express();

function getInfo(req, res, next) {
    console.log(`Method is ${req.method}, URL is ${req.url}, Date is ${new Date()}`);
    next();
}
app.get('/info', getInfo, function (req, res) {
    res.json({
        ans: 200,
    })
})

app.listen(3000);