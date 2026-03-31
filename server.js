const express = require("express");
const app = express();
const port = 3000;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./myDb.db", (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("Databasen är skapad");
    }
})

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    res.render("index", {courses: [] });
});

app.get("/add", (req, res) => {
    res.render("add");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(port, () =>{
    console.log("servern körs på " + port);
});