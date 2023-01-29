const express = require('express');
const path = require('path');
const fs =require ("fs");
const app = express();
const PORT = 3001;

// Routes

 app.use(express.static('public'));

 //Displays characters

app.get('/', (req, res) => res.send('/index.html'));

 app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
 );
app.get("/api/notes", (req, res) =>
         fs.readFile("./db/db.json", "utf8", 
         (err, results) => {
          console.log(results) 
          res.json(JSON.parse(results)) 
         })

 );

 //Create new notes to save on request, added to the db.json file
 //Return new note

 app.post("./api/notes", (req,res) => {
    let newNote =req.body;
    let noteList=JSON.parse(fs.readFile("./db/db.json", "utf8"));
    let noteLength = (noteList.lenght).toString();
    
//Create new property based on length and assign to Json object
//New property is ID
newNote.id = notelenght;
noteList.push(newNote);
fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
res.json(noteList);


 })

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
