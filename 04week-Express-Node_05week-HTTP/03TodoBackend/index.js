const express = require('express');
const app = express();

let todos = [];
let cnt = 0;
// Reading data
app.get('/getTodo', function (req, res){
    res.json({
        todos
    });
})

// Creating Todo
app.post('/createTodo', function (req, res){
    // const { title, description } = req.body; //get data from request body
    const title = req.query.title;
    const description = req.query.description;

    const newTodo = {
        id: cnt++,
        title: title,
        description: description
    }

    todos.push(newTodo)

    res.json({
        message: 'Todo created Successfully',
        todo: newTodo
    })
})

//Updating Todo
app.put('/update', function (req, res) {
   
})

app.delete('/delete', function (req, res) {
    
})

app.listen(3000);

