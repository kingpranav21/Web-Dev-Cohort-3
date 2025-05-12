const express = require('express');
const app = express();

let todos = [];

//get todos
app.get('/getTodo', function (req,res) {
    res.json({
        todos
    })
})

//add todos
app.post('/createTodo', function (req, res) {
    let title = req.query.title;
    let description = req.query.description;

})

//delete todos
app.delete('/deleteTodo', function (req, res) {
    
})

app.listen(3000);