const mongoose = require('mongoose');

const talksSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate : { type: Date, required: true },
  category : { type: String, required: true },
  do : { type: Boolean, required: true }
});

module.exports = mongoose.model('Talks', talksSchema);