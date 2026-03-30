/* Mina tabeller */

/* courses(id(pk), courseCode, courseName, syllabus, progression) */
create table courses(
    id integer not null,
    courseCode integer,
    courseName varchar(30),
    syllabus varchar(200),
    progression varchar(10)
);