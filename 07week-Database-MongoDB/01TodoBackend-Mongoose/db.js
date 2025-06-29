//mongoose is used to connect database
const mongoose = require("mongoose");

//defining the schema for mongoose
//mongoose exports a class called schema
const Schema = mongoose.Schema;


const ObjectId = Schema.ObjectId;
//now defining the schema for my users db
const User = new Schema(
    {
        email: { type: String, unique: true },
        password: String,
        name: String
    }
)

const Todo = new Schema(
    {
        description: String,
        done: Boolean,
        userId: ObjectId
    }
)

//mongoose.model helps you put in data in which collection you want to add
const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

//to export these models
module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}