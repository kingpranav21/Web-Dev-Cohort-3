//1) CORS

// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(express.json());

// app.use(cors());

// for some specific limited domains:
// app.use(cors({
//     domains: ["http://google.com", "facebook.com"]
// }));

// app.post("/sum", function (req, res) {
//     const a = parseInt(req.body.a);
//     const b = parseInt(req.body.b);

//     res.json({
//         answer: a + b,
//     })
// })

// app.listen(3003, () => {
//   console.log("Server running on port 3003");
// });

//2)Same Origin
//2nd way is, if you are hosting backend and frontend both on the same domain,
//then there is no cross origination

const express = require("express");
const app = express();
app.use(express.json());

//home
//how we are hosting both on the same domain
//we can call that file path here
//__dirname gives the directory path or absolute path holding that file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html")
})

app.post("/sum", function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        answer: a + b,
    })
})

app.listen(3003, () => {
  console.log("Server running on port 3003");
});