import express from 'express'
import { getNotes ,createNote,getNote} from './database.js';
import cors from 'cors';


 const app = express();

 app.use(express.json());

 app.use(cors());

app.get("/api/blogs",async(req, res)=> {

  const notes = await getNotes()
    res.send(notes)
})

app.get("/api/blogs/:id",async(req, res)=> {
  const id = req.params.id
  const notes = await getNote(id)
  res.send(notes)
})

app.post("/api/blogs",async(req, res)=>{
const {title,contents} = req.body
const note =  await createNote(title,contents)
res.status(201).send(note)

})

app.use((err,req,res,next)=>{

console.error(err.stack)
res.status(500).send("smth broke :(")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

