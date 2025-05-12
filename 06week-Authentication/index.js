//slide link : https://petal-estimate-4e9.notion.site/Authentincation-a4b43c7cc1d14535a7b5b366080095fa

const express = require("express");
const app = express(); //creation of app

app.use(express.json()); //middleware

// app.post('/signup', (req, res) => {

// })
const users = [];
const signUpHandler = (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
 
    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "Account created"
    })
}

const generateToken = () => {
    let options = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let token = "";
    for (let i = 0; i < 32; i++){
        token += options[Math.floor(Math.random() * options.length)];
        // Math.random -> 0-1 ~0.98
        // Options.length -> 0-42 ~0.98*4
        // Floor converts into a random int 
    }
    return token;
}
const signInHandler = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let foundUser = null;

    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].username == username && users[i].password == password) {
    //     foundUser = users[i];
    //   }
    // }

    // OR

    foundUser = users.find((user) => {
        if (user.username == username && user.password == password) {
            return true;
        }
    })
    if (foundUser) {
        const token = generateToken();
        foundUser.token = token;
        res.json({
            message:token
        })
        console.log({ token: token });
    } else {
        //unauthorized
        //send sends req to server
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
}

app.post("/signup", signUpHandler);
app.post('/signin', signInHandler);
//res:
// { username: 'Pranav', password: '123rp' }
// { token: 'iyItbCaXhqH5mrF6NxEXjHTmK5zJ2ZAs' }

//so headers are meta data
//we studied that req headers are used to get info
//you will put your token in header as token/ authorization
//server needs to parse/get this token from the header
//server then checks who this user is and returns data
//in Headers : set Key: Content-Type , value : application/json
//Authorization : "tokenValue"
app.get('/me', (req, res) => {
    const token = req.headers.token;
    let foundUser = null;
    for (let i = 0; i < users.length; i++){
        if (users[i].token == token) {
            foundUser = users[i];
        }
    }
    
    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
        console.log({
          username: foundUser.username,
          password: foundUser.password,
        });
    } else {
        res.json({
            message: "token invalid"
        })
    }
})
app.listen(3000, () => {
    console.log(`app is listening on port 3000`)
});



