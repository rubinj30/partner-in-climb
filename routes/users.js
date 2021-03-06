const express = require('express')
const router = express.Router()
const User = require('../db/models/User')
const bodyParser = require('body-parser')

/* GET users listing. */
router.get('/', (request, response) => {
  User.find({})
    .then((users) => {
      response.render('users/index', {
        users,
        pageTitle: 'Climbers'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/new', (request, response) => {
  response.render('users/new', { pageTitle: 'New Climber' })
})

router.get('/:userId', (request, response) => {

  const userId = request.params.userId
  console.log(userId)
  User.findById(userId)
    .then((user) => {
      response.render('users/show', {
        pageTitle: 'Climber Profile',
        user
      })
    })
})

router.post('/',  (request, response) => {
  const newUserInfo = request.body
  User.create(newUserInfo)
      .then(() => {
          response.redirect('/users')
      })
      .catch((err) => {
          console.log(err)
      })
})

router.get('/:userId/edit', (request, response) => {
  const userId = request.params.userId
  User.findById(userId)
    .then((user) => {
      response.render('users/edit', {
        user,
        pageTitle: 'Edit Profile'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.put('/:userId', (request, response) => {
  const userId = request.params.userId
  const updatedUserInfo = request.body

  User.findByIdAndUpdate(userId, updatedUserInfo, {new: true})
    .then(() => {
      response.redirect(`/users/${userId}`)
    })
})


router.get('/:userId/delete', (request, response) => {
  const userId = request.params.userId
  User.findByIdAndRemove(userId)
      .then(() => {
          response.redirect('/users')
      })
})



module.exports = router
