const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  organizationName: {
    type: String,
    require: true
  },
  emailAddress: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  streetAddress: {
    type: String,
    required: true
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
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    // ^ make true eventually
  },
}, {
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema)
