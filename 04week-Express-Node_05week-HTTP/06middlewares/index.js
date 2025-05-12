//Middlewares: refers to the functions who have access to request object 
// , response object and next function

const express = require("express");
const app = express();

let requestCount = 0;

// 1 way:

// app.get("/sum", function (req, res) {
//     requestCount = requestCount + 1;
//     console.log(`Total of no. of requests is ${requestCount}`);
//   const a = parseInt(req.query.a); 
//   const b = parseInt(req.query.b);

//   res.json({
//     a: a,
//     b: b,
//     sum: a + b,
//   });
// });

// app.get("/multiply", function (req, res) {
//     requestCount = requestCount + 1;
//     console.log(`Total of no. of requests is ${requestCount}`);
//   const a = req.query.a;
//   const b = req.query.b;

//   res.json({
//     a: a,
//     b: b,
//     prod: a * b,
//   });
// });

// 2nd way:

// function requestCountIncreaser() {
//     requestCount += 1;
//     console.log(`Total of no. of requests is ${requestCount}`);
// }
// app.get("/sum", function (req, res) {
//     requestCountIncreaser();
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   res.json({
//     a: a,
//     b: b,
//     sum: a + b,
//   });
// });

// app.get("/multiply", function (req, res) {
//     requestCountIncreaser();
//   const a = req.query.a;
//   const b = req.query.b;

//   res.json({
//     a: a,
//     b: b,
//     prod: a * b,
//   });
// });


function requestCountIncreaser(req,res,next) {
    requestCount += 1;
    req.name = "Pranav";
    console.log(`Total of no. of requests is ${requestCount}`);
    next();
    // res.json('I ended the request');
}
app.get("/sum",  requestCountIncreaser ,function (req, res) {
 
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
    console.log(req.name);
  res.json({
    a: a,
    b: b,
    sum: a + b,
  });
});


app.listen(3000);
