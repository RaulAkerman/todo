import express from "express"
import { Todo } from "./types"
const app = express()
app.use(express.json())
const port = 3000

const todos: Todo[] = []


app.get('/', (req, res) => {
    console.log(req)
  res.send('Hello World!')
})

app.post('/todos', (req,res) =>{
    const {title, desc} = req.body as Partial<Todo>
    if ( !title || !desc ) {
        return res.status(400).send()
    }
    console.log(req.body.title)
    todos.push({
      title,
      desc
    })
    res.status(201).send()
})

app.get('/todos', (req,res) =>{
  return res.status(200).json(todos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})