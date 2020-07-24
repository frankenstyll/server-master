const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(body_parser.json());
app.use(cors());

//connect posts.js
const posts = require("./routes/api/posts");
const employeeDao = require("./routes/api/employeeDao");

app.use("/api/posts" , posts);
app.use("/api/employee", employeeDao);


//below is connection string 
//mongodb+srv://frankenstyll:17022532@cluster0-ksrrb.mongodb.net/test?retryWrites=true&w=majority

const port = process.env.port || 5000;

app.listen( port , () => {
    console.log("Server is started at port " + port);
});