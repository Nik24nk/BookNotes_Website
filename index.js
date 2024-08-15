import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

// DATABASE CONNCETIVITY..............
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Notes",
    password: "nk24112003@",
    port: "5432"
});
db.connect();

const app = express();
const port = 3000;

//VARIBLES DEFINED.....................
let isbn, title, author, description, notes, date, sorting, rating, i;
var data;

// MIDDLEWARE WORKING..................................
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// HOME ROUTE HERE...............................................
app.get("/", async (req, res) => {

    try {

        if (sorting === "Recent") {
            const result = await db.query("SELECT * FROM books ORDER BY id DESC");
            data = result.rows;
            res.render("home.ejs", { data });
        }
        else if (sorting === "Rating") {
            const result = await db.query("SELECT * FROM books ORDER BY rating DESC");
             data = result.rows;
            res.render("home.ejs", { data });
        }
        else{
            const result = await db.query("SELECT * FROM books ORDER BY id ASC");
            data = result.rows;
            res.render("home.ejs", { data });
           console.log(data[0].description.length);
        }    
    }
    catch (error) {
        console.log(error);
    }
});

// INSERT DATA INTO DATABASE......................................
app.get("/database", async (req, res) => {
    try {
        await db.query("INSERT INTO books(title, author, isbn, description, notes,date,rating) VALUES($1,$2,$3,$4,$5,$6,$7)",
            [title, author, isbn, description, notes, date, rating]);
        res.redirect("/");
    }
    catch (error) {
        console.log(error);
    }
})

// WRITING ROUTE HERE.................................
app.get("/write", (req, res) => {
    res.render("notes.ejs");
});

// IMAGE SEARCH ROUTE HERE..............................
app.post("/search", async (req, res) => {
    title = req.body.title;
    author = req.body.author;
    try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${title} ${author}`);
        const result = response.data;
        isbn = result.docs[0].isbn[0]
        res.render("notes.ejs", { isbn });
    }
    catch (error) {
        res.send("no image found")
        console.log(error);
    }
});

// SAVE ROUTE HERE...............................................
app.post("/post", (req, res) => {
    description = req.body.description;
    notes = req.body.notes;
    rating = req.body.rate;
    date = new Date();
    res.redirect("/database");
});

// READ BOOKE NOTES ROUTE HERE.....................................
app.get("/read/:id", (req, res) => {
    const id = req.params.id;
    // console.log(id)
    res.render("read.ejs", { data: data[id], id });
});

// EDITING NOTES ROUTE  HERE...................................
app.get("/edit", async (req, res) => {
    const id = req.query.id;
    res.render("edit.ejs", { data: data[id] });

});

//UPDATING ROUTE HERE...............................................
app.post("/update/:id", async (req, res) => {
    description = req.body.description;
    notes = req.body.notes;
    rating = req.body.rate;
    const id = req.params.id;
    await db.query("UPDATE books SET description=$1, notes=$2, rating=$3 WHERE id=$4", [description, notes, rating, id]);
    res.redirect("/")
});

//Deteling the Books Data from Database......................
app.get("/delete", async (req, res) => {
    const id = req.query.id;
    await db.query("DELETE FROM books WHERE id=$1", [id]);
    res.redirect('/');
});

//SORTING BOOKS ACCORDING TO RECENCY AND RATING.......
app.post("/sorting", (req, res) => {
    sorting = req.body.recent || req.body.rating;
    console.log(sorting)
    res.redirect("/");
})
app.listen(port, (req, res) => {
    console.log("server is running on port ", port);
});