const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    res.send("hello world");
});

app.listen(port, () =>{
    console.log("servern körs på " + port);
});