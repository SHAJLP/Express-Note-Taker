const express = require('express');
const path = require('path');
const fs =require ('fs');
const allNotes = require('./db/db.json');
// const { NOTINITIALIZED } = require('dns');
const app = express();
const PORT = process.env.PORT || 5000;

// Routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 app.use(express.static('public'));

 app.get('/api/notes', (req,res) =>
 res.json(allNotes.slice(1))
);
 //Displays characters

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html')));

 app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
 );
// app.get("/api/notes", (req, res) =>
//          fs.readFile("./db/db.json", "utf8", 
//          (err, results) => {
//           console.log(results) 
//         //   res.json(JSON.parse(results))
//          })

//  );

 //Create new notes to save on request, added to the db.json file
 //Return new note

//  app.post("./api/notes", (req,res) => {
//     let newNote =req.body;
//     let noteList=JSON.parse(fs.readFile("./db/db.json", "utf8"));
//     let noteLength = (noteList.lenght).toString();
    
// //Create new property based on length and assign to Json object
// //New property is ID
//     newNote.id = notelenght;
//     noteList.push(newNote);
//     fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
//     res.json(noteList);
app.get('*', (req,res) =>
 res.sendFile(path.join(__dirname,'/public/index.html'))
 );


function addNewNote(body, notesArray){
  console.log(body, "body");
  console.log(notesArray,"notesArray");
  const newNote = body;
  if(!Array.isArray(notesArray))
    notesArray = [];
    // if(notesArray.length === 0)
    // body.id = notesArray[0];
    newNote.id = notesArray.length + 1;
     console.log(body); 
    // notesArray[0]++;
    // console.log(notesArray); 
    notesArray.push(newNote);

  fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;  
}

app.post('/api/notes', (req,res) => {
 const newNote = addNewNote(req.body, allNotes);
 res.json(newNote);
})


//  //Create delete note
//  app.delete('/api/notes/:id',(req,res) => {
//     let noteList =JSON.parse(fs. readFileSync("./db/db.json", "utf8"));
//      let noteId =(req.params.id).toString();

//     noteList =noteList.filter(selected=>{
//         return selected.id =noteId;
//      })

//     fs.writeFileSync("'./db/db.json", JSON.stringify(noteList));
//     res.json(noteList);
//   });


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
