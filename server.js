const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const Database = require("better-sqlite3");
const db = new Database("./myDb.db");

db.exec(`create table if not exists courses(
    id integer primary key autoincrement,
    courseCode varchar(15) not null,
    courseName varchar(30) not null,
    syllabus varchar(200) not null,
    progression varchar(10) not null
)`);

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const rows = db.prepare(`select * from courses`).all();
    res.render("index", {courses: rows});
});

app.get("/add", (req, res) => {
    res.render("add", { error: null });
});

app.post("/add", (req, res) => {
    const {kurskod, kursnamn, kursplan, kursprogression} = req.body;

    if (!kurskod || !kursnamn || !kursplan || !kursprogression) {
        res.render("add", {error: "Vänligen fyll i alla fält!"});
        return;
    }

    db.prepare(`insert into courses (courseCode, courseName, syllabus, progression)
        values (?, ?, ?, ?)`).run(kurskod, kursnamn, kursplan, kursprogression);
        res.redirect("/");
    });

app.get("/delete/:id", (req, res) =>{
    const id = req.params.id;
    db.prepare(`delete from courses where id = ?`).run(id);
    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(port, () =>{
    console.log("servern körs på " + port);
});
