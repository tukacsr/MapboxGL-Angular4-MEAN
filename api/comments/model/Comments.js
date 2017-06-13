'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
  markerId: { type: String, required: true },
  user: { type: String, required: true },
  comText: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
})

module.exports = mongoose.model('Comment', ContactSchema)