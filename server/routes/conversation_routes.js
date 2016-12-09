var Conversation = require('../models/Conversation')
var bodyparser = require('body-parser')

module.exports = function(router) {
  router.use(bodyparser.json())

  // Get all conversations of user
  router.get('/conversations/:id', function(req, res) {

    Conversation.find({ $or: [ {between: req.params.name}, {private: false } ] }, {id:1, private: 1, subscribers: 1, _id:0}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data)
    })
  })

  // Create a new conversation
  router.post('/conversations/new_conversation', function(req, res) {
    var newConversation = new Conversation(req.body);
    newConversation.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'})
      }

      res.json(data)
    })
  })

  // Join a conversation
  router.post('/conversations/:name', function(req, res) {

  })
}
