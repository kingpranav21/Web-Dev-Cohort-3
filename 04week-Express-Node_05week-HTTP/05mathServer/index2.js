const express = require('express');
const app = express();

app.get("/sum", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        sum: a + b,
    })
});

app.get('/multiply', function (req, res) {
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        prod: a * b,
    })
})

app.get('/sub/:a/:b', function (req, res) {
    const a = req.params.a;
    const b = req.params.b;

    res.json({
        res : a - b,
    })
})

app.get('/divide', function (req, res) {
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        res: a / b,
    })
})

app.listen(3000);