const express = require('express')
const app = express()

let reminders = [
  {
    
    name: "Buy some eggs",
    timestamp: "2021-11-10T13:00:00.141Z",
    id: 1
  },
  {
    name: "Make an omelette",
    timestamp: "2021-11-11:T08:00:00.141Z",
    id: 2
  },
  {
    name: "Wash dishes",
    timestamp: "2021-11-11T09:00:00.141Z",
    id: 3
  },
  {
    name: "Buy more eggs",
    timestamp: "2021-11-11T13:00:00.141Z",
    id: 4
  }
]

app.get('/api/reminders', (req, res) => {
  res.json(reminders)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
