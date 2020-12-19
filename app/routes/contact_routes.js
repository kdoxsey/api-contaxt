// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Contact = require('../models/contact')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// index route
router.get('/contacts', requireToken, (req, res, next) => {
  Contact.find({ owner: req.user.id })
    .populate('map')
    .then(contacts => {
      return contacts.map(contact => contact.toObject())
    })
    .then(contacts => res.status(200).json({ contacts }))
    .catch(next)
})

// show route
router.get('/contacts/:id', requireToken, (req, res, next) => {
  Contact.findById(req.params.id)
    // .populate('map')
    .then(handle404)
    .then(contact => res.status(200).json({ contact: contact.toObject() }))
    .catch(next)

})

// create route
router.post('/contacts', requireToken, (req, res, next) => {
  req.body.contact.owner = req.user.id
  Contact.create(req.body.contact)
    .then(contact => res.status(201).json({ contact }))
    .catch(next)
})

// update route
router.patch('/contacts/:id', requireToken, (req, res, next) => {
  delete req.body.contact.owner
  Contact.findById(req.params.id)
    .then(handle404)
    .then(contact => {
      requireOwnership(req, contact)
      return contact.updateOne(req.body.contact)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// destroy route
router.delete('/contacts/:id', requireToken, (req, res, next) => {
  Contact.findById(req.params.id)
    .then(handle404)
    .then(contact => {
      requireOwnership(req, contact)
      contact.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
