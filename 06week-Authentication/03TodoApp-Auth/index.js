const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const JWT_SECRET = "NEvER%6";
app.use(express.json());

let users = [];
app.get('/', (req, res) => {
    res.json(
        {
            message: "hello p;",
        }
    )
})
const signUpHandler = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "user signed up",
    })
}
const signInHandler = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    let foundUser = false;
    foundUser = users.find((user) => {
        if (user.username === username && user.password === password) {
            return true;
        }
    })

    if (foundUser) {
        const token = jwt.sign({ username: foundUser.username }, JWT_SECRET);
        res.json({
            Authorization: token,
        })
    } else {
        res.json("Person not authorized");
    }
}
app.post('/signIn', signInHandler);
app.post('/signUp', signUpHandler);

//authorization
//this thing is verifying which user it is and giving you in req.username
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const decodedInfo = jwt.verify(authHeader, JWT_SECRET);
    if (decodedInfo.username) {
        req.username = decodedInfo.username;
        next();
    } else {
        res.json({
            message: "user is not logged in"
        })
    }   
}

//createTodo

let todos = [];
app.post('/createTodo', authMiddleware, (req, res) => {
    const username = req.username;
    let foundUser = false;
    foundUser = users.find((user) => {
        if (user.username === username) {
            return true;
        }
    })

    if (foundUser) {
        const title = req.body.title;
        const description = req.body.description;
        const done = req.body.status;

        todos.push({
            id: Date.now(),
            title: title,
            description: description,
            status: done,
            username: username,
        })

        res.json({
          message: "Todo created successfully",
        });
    } else {
        res.json({
            message: "user not signed in"
        })
    }
})
app.delete('/deleteTodo/:id', authMiddleware, (req, res) => {
    const username = req.username;
    const todoId = req.params.id;
    todos = todos.filter((todo) => !(todo.username === username && todo.id == todoId));

    res.json({
        message: "todo deleted successfully"
    })
})

app.put('/updateTodo/:id', authMiddleware, (req, res) => {
    const username = req.username;
    const todoId = req.params.id;
    let foundUserTodo = null;
    foundUserTodo = todos.find((todo) => (todo.username === username && todo.id == todoId));

    if (foundUserTodo) {
        foundUserTodo.title = req.body.title;
        foundUserTodo.description = req.body.description;
        foundUserTodo.status = req.body.status;

        res.json({
            message: "Updated Todo Successfully",
        })
    } else {
        res.json({
            message: "todo not found"
        })
    }
})
app.get('/getTodos', authMiddleware, (req, res) => {
    const username = req.username;
    const foundUserTodos = todos.filter((todo) => todo.username === username);

        res.json({
            todos: foundUserTodos
        })
})

app.listen(3000);



//requirements
//users can sign in and sign up
//can create , delete , update todo
//can see their existing todos and mark them done