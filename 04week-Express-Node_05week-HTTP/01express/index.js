const express = require('express');
const app = express()


app.get('/', function (req, res) {
    res.send("<h1>Helllo World</h1>")
})
app.get('/jsondata', function (req, res) {
    res.json({
        name: 'Kumar Sanu',
        occupation: 'Singer'
    })
})
app.get('/test_route', function (req, res) {
    res.json({
        id: 1,
        testMessage: 'Tested 200'
    })
})
app.listen(3000);