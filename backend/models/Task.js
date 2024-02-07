const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
   taskName: { type: String, required: true },
   description: { type: String, required: false },
   createdAt: {
      type: Date,
      default: Date.now,
      required: true,
   },
   category: { type: String, required: true },
   do: { type: Boolean, required: true },
})

module.exports = mongoose.model('Task', taskSchema)
