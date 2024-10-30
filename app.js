import express from 'express'
import { getNotes ,createNote,getNote,deleteNote,updateNote} from './database.js';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const docYaml = YAML.load("./openapi.yaml");

 const app = express();

 app.use(express.json());

 app.use(cors());


app.use("/api/about", swaggerUi.serve, swaggerUi.setup(docYaml));

app.get("/api/blog",async(req, res)=> {

  const notes = await getNotes()
    res.send(notes)
})

app.get("/api/blog/:id",async(req, res)=> {
  const id = req.params.id
  const notes = await getNote(id)
  res.send(notes)
})

app.post("/api/blog",async(req, res)=>{
const {title,contents} = req.body
const note =  await createNote(title,contents)
res.status(201).send(note)

})

app.patch("/api/blog/:id", async (req, res) => {
  const id = req.params.id;
  const {title,contents} = req.body
  try {
    const result = await updateNote(id, title,contents);
    if (result === undefined) {
      return res.status(404).send('Note not found');
    }
    res.send('Note updated successfully');
  } catch (err) {

    res.status(500).send('Failed to update the note');

  }
});

app.delete("/api/blog/:id", async (req, res) =>{
    const id  = req.params.id;
    try
    {
      const result = await deleteNote(id);
      if (result === 0) {
        res.status(404).send("Not found");
      };
      res.status(200).send("");
    }
    catch(err)
    {
      console.log(err)
      res.status(500).send('Failed to delete the note');
    }
  });

app.use((err,req,res)=>{

console.error(err.stack)
res.status(500).send("smth broke :(")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

