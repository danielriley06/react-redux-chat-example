var mongoose = require('mongoose')

var channelSchema = mongoose.Schema({
  id: String,
  subscribers: Array
})

module.exports = mongoose.model('Channel', channelSchema)
