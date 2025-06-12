const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json()); //for parsing data

let users = [];

const JWT_SECRET = "ITSMELETSBEGIN";
const loggerMiddleware = (req, res, next) => {
  console.log(req.method + " request came");
  next();
};

//moving my frontend to backend host to avoid cors
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})
app.post('/signUp',loggerMiddleware, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //first we should also check if that exists in the users
    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "User onboarded",
    })
})
app.post('/signIn',loggerMiddleware, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;
    // now i will generateToken
    foundUser = users.find((it) => {
        if (it.username == username && it.password == password) {
            return true;
        }
    })
    if (foundUser) {
        const token = jwt.sign({ username: foundUser.username }, JWT_SECRET); //token
        res.json({
            authorization: token,
        })
    } else {
        res.json({
            message: "Invalid Username or Password"
        })
    }
})
const authMiddleware = (req, res, next) => {
    //in prod we should wrap this in try catch block
    const token = req.headers.authorization; //token extraction
    const decodedInfo = jwt.verify(token, JWT_SECRET); //decoded verification
    if (decodedInfo.username) {
        req.username = decodedInfo.username; //modifying the req/res object
        next(); //calling the next function
    } else {
        //end req-res cycle
        res.json({
            message: "User is not logged in"
        })
    }
}
app.get("/me", authMiddleware, loggerMiddleware, (req, res) => {
  const username = req.username; //here it is getting that using the middleware
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
    console.log({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "token invalid",
    });
  }
});

app.listen(3000)