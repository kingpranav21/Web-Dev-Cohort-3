

// let requestCount = 0;
// function ReqIncreaser(req, res) {
//     requestCount += 1;
//     console.log(requestCount);
//     req.requestCount = requestCount;
// }
// app.get('/sum', function (req, res) {

//     ReqIncreaser(req, res);
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);
    
//     res.json({
//         sum: a + b,
//         requestCount: req.requestCount,
//     })
// })

// app.listen(3000);


// assignment
const express = require('express');
const app = express();

// function getInfo(req, res, next) {
//     console.log(`Req method is ${req.method} , URL is ${req.url}, Date is ${new Date()}`)
//     next();
// }
// function displayInfo(req, res) {
//     res.json({
//         status: 200,
//     })
// }

app.use()
app.post('/getData', function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        sum: a + b
    })
});

app.listen(3000);