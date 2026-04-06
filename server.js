// Importerar express och skapar en app
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Importerar better-sqlite3 och skapar databasen
const Database = require("better-sqlite3");
const db = new Database("./myDb.db");

//Skapar courses tabellen  om den ej finns
db.exec(`create table if not exists courses(
    id integer primary key autoincrement,
    courseCode varchar(15) not null,
    courseName varchar(30) not null,
    syllabus varchar(200) not null,
    progression varchar(10) not null
)`);

// Middleware som läser formulärdata och serverar statiska filer
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Startsida, hämtar alla kurser från databasen och skickar till vyn
app.get("/", (req, res) => {
    const rows = db.prepare(`select * from courses`).all();
    res.render("index", {courses: rows});
});

//Visar formulärdata för att lägga till en kurs.
app.get("/add", (req, res) => {
    res.render("add", { error: null });
});

// Tar emot formulärdata, validerar och sparar kursen i databasen
app.post("/add", (req, res) => {
    const {kurskod, kursnamn, kursplan, kursprogression} = req.body;

    //Validering, kontrollerar att alla fält e fyllda
    if (!kurskod || !kursnamn || !kursplan || !kursprogression) {
        res.render("add", {error: "Vänligen fyll i alla fält!"});
        return;
    }

    //Sparar kursen i databasen
    db.prepare(`insert into courses (courseCode, courseName, syllabus, progression)
        values (?, ?, ?, ?)`).run(kurskod, kursnamn, kursplan, kursprogression);
        res.redirect("/");
    });

// Raderar en kurs baserat på id och skickar tillbaka till startsidan
app.get("/delete/:id", (req, res) =>{
    const id = req.params.id;
    db.prepare(`delete from courses where id = ?`).run(id);
    res.redirect("/");
});

//Om sidan
app.get("/about", (req, res) => {
    res.render("about");
})

//Startar servern
app.listen(port, () =>{
    console.log("servern körs på " + port);
});
