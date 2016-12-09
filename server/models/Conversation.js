var mongoose = require('mongoose')

var conversationSchema = mongoose.Schema({
  id: String,
  subscribers: Array
})

module.exports = mongoose.model('Conversation', conversationSchema)
