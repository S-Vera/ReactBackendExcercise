const mongoose = require('mongoose')

const url = 'mongodb+srv://@cluster0.ruvzq.mongodb.net/fullstack-reminder'

mongoose.connect(url)


  const reminderSchema = new mongoose.Schema({
    name: String,
    timestamp: Date,
    id: ''
  })
  
  const Reminder = mongoose.model('Reminder', reminderSchema);

  if (process.argv.length > 1){
    Reminder
    .find({})
    .then(result => {
        console.log('Reminders:')
      result.forEach(reminder => {
        console.log(reminder)
      })
      mongoose.connection.close()
    })
  
  }




