const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
   taskName: { type: String, required: true },
   description: { type: String, required: false },
   dueDate: { type: Date, required: true },
   category: { type: String, required: true },
   do: { type: Boolean, required: true },
})

module.exports = mongoose.model('Task', taskSchema)
