//External middlewares
//express.json() middleware

// const express = require('express');
// const app = express();

// //in put & post request, input's a and b are part of body
// app.use(express.json());
// app.post("/sum", function (req, res) {
//     console.log(req.body);
//     const a = parseInt(req.body.a);
//     const b = parseInt(req.body.b);

//     res.json({
//         ans: a + b,
//     })

// });

// app.listen(3000);


//body-parser library to post json data in the body

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//in put & post request, input's a and b are part of body
app.use(bodyParser.json());
app.post("/sum", function (req, res) {
  console.log(req.body);
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.json({
    ans: a + b,
  });
});

app.listen(3000);