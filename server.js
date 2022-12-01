const express = require("express");
const fs = require("fs");
const path = require("path")
const notes = require("./db/db.json")

const app = express();
const PORT = 3001;

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
        notes.push(req.body)
        fs.writeFileSync("./db/db.json", JSON.stringify(notes))
        res.json(notes)
        })

app.listen(PORT,()=>
console.log(`server running on ${PORT}`))