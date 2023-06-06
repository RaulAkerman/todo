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
    console.log(req.body.title + " " + req.body.desc)
    todos.push({
      title,
      desc,
      time: new Date()
    })
    res.status(201).send()
})

app.get('/todos', (req,res) =>{
  return res.status(200).json(todos)
})

app.delete('/todos', (req,res) =>{
  const {title} = req.body as Partial<Todo>
  if ( !title ) {
      return res.status(400).send()
  }
  const index = todos.findIndex((todo) => todo.title === title)
  if (index === -1) {
    return res.status(404).send()
  }
  todos.splice(index, 1)
  return res.status(200).send()
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})