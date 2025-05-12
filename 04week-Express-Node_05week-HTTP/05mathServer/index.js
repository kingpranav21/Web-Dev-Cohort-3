const express = require('express');
const app = express();

//req.query is used to request input
app.get("/sum", function (req, res) {
    const a = parseInt(req.query.a); //converting/parsing string to int
    const b = parseInt(req.query.b);

    
    res.json({
        a : a,
        b : b,
        sum : a + b
    })
})

app.get("/multiply", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;

    res.json({
    a: a,
    b: b,
    prod: a * b,
    });
});

app.get("/divide/:a/:b", function (req, res) { 
    const a = req.params.a;
    const b = req.params.b;

    res.json({
    a: a,
    b: b,
    divide: a / b,
    });
});
//other way of creating Dynamic routes
app.get("/subtract/:a/:b", function (req, res) { 
    const a = req.params.a;
    const b = req.params.b;

    res.json({
    a: a,
    b: b,
    sub: a - b,
    });
});


app.listen(3000);
