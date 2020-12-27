const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  organizationName: {
    type: String,
    require: false
  },
  emailAddress: {
    type: String,
    require: false
  },
  phoneNumber: {
    type: String,
    require: false
  },
  streetAddress: {
    type: String,
    required: false
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema)
