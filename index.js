const express = require('express')
const app = express()
const bodyParser = require('body-parser')
import axios from 'axios'


const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(express.static('build'))

let reminders = [
  {
    
    "name": "Buy some eggs",
    "timestamp": "2021-11-10T13:00:00.141Z",
    "id": 1
  },
  {
    "name": "Make an omelette",
    "timestamp": "2021-11-11T08:00:00.141Z",
    "id": 2
  },
  {
    "name": "Wash dishes",
    "timestamp": "2021-11-11T09:00:00.000Z",
    "id": 3
  },
  {
    "name": "Buy more eggs",
    "timestamp": "2021-11-11T13:00:00.000Z",
    "id": 4
  }
]

app.get('/api/reminders', (request, response) => {
  response.json(reminders)
})

app.get('/api/reminders/:id', (request, response) => {
  const id = Number(request.params.id)
  const reminder = reminders.find(reminder => reminder.id === id )

  if ( reminder) {
    response.json(reminder)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/reminders/:id', (request, response) => {
  const id = Number(request.params.id)
  reminders = reminders.filter(reminder => reminder.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = reminders.length
  id = Math.floor(Math.random()*(1000-maxId)+maxId+1)
  return id
}

app.post('/api/reminders', (request, response) => {
  const body = request.body
  

  if (body.name === undefined) {
    return response.status(400).json({error: 'name of the task is missing'})
  }

  if (body.timestamp === undefined){
    return response.status(400).json({error: 'timestamp is missing'})
  }

  for (i = 0; i < reminders.length; i++){
    if (reminders[i].name === body.name){
      return response.status(400).json({error: 'task with same name already exists'})
    }
  }




  const reminder = {
    name: body.name,
    timestamp: body.timestamp,
    id: generateId()
  }
  

  reminders = reminders.concat(reminder)

  response.json(reminder)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
