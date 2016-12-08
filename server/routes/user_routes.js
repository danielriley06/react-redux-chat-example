var bodyparser = require('body-parser')
var User = require('../models/User.js')

module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json())

  router.get('/test', function(req, res){
    res.send('<h1>Hello world</h1>');
  })

  router.get('/auth/facebook', passport.authenticate('facebook', {
    session: false,
    successRedirect: '/chat',
    failureRedirect: '/'
  }))

  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    session: false,
    successRedirect: '/chat',
    failureRedirect: '/'
  }))

  router.post('/signup', passport.authenticate('local-signup', { session: false}), function(req, res) {
    res.json(req.user)
  })

  router.post('/login', passport.authenticate('local-login', { session: false}), function(req, res) {
    res.json(req.user)
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.end()
  })

  //get auth credentials from server
  router.get('/load_auth_into_state', function(req, res) {
    res.json(req.user)
  })

  // get usernames for validating whether a username is available
  router.get('/all_usernames', function(req, res) {
    User.find({'local.username': { $exists: true } }, {'local.username': 1, _id:0}, function(err, data) {
      if(err) {
        console.log(err)
        return res.status(500).json({msg: 'internal server error'})
      }
      res.json(data)
    })
  })
}
