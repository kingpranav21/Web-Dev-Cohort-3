const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "NEvER%6";

const app = express();
//Mongoose is an ORM 
app.use(express.json()); //for parsing the body

//to connect
//mongoose.connect(mongodbClusterUrl/dbName);
//if not created db it will create one for you

mongoose.connect("mongoDBClusterUri/Todo-app-db");

app.post('/signUp',async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    //to create an entry we have a function in mongoose
    //as it is a promise so we are using await here
    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "user signed up"
    })
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //again a promise 
    //a function of mongoose : findOne
    const user = await UserModel.findOne({
        email: email,
        password:password
    })

    if (user) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET );
        res.json({
            token:token,
        })
    } else {
        //403 means unauthorised
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData) {
        req.userId = decodedData.id; //modifying the req object
        next();
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
}

app.post('/createTodo', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const description = req.body.description;

    await TodoModel.create({
        description,
        userId
    })
    res.json({
        userId: userId
    })
})

app.get('/getTodo', authMiddleware, async (req, res) => {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    })
    res.json({
        userId: userId,
        todos: todos
    });
})

app.listen(3000)
