/* Mina tabeller */

/* courses(id(pk), courseCode, courseName, syllabus, progression) */
create table courses(
    id integer not null,
    courseCode varchar(15) not null,
    courseName varchar(30) not null,
    syllabus varchar(200) not null,
    progression varchar(10) not null
);