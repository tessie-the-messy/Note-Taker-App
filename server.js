const { randomUUID } = require("crypto");
const express = require("express");
const fs = require("fs");
const path = require("path")
const notes = require("./db/db.json")

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "./public/index.html"))
})


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
    })


app.get("/api/notes", (req, res) => {
    res.json(notes)
    })


app.post("/api/notes", (req, res) => {

    const {title, text} = req.body 
        if (title && text ){
            const newNote = {
                title,
                text,
                id: randomUUID(),
            };
            notes.push(req.body)
        fs.writeFileSync("./db/db.json", JSON.stringify(notes))
        res.json(notes)
        } else {
            res.error("Error in adding new note")
        }

        })

app.listen(PORT,()=>
console.log(`server running on ${PORT}`))