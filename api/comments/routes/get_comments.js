'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Comment = require('../model/Comments')
const router = express.Router()

router.route('/')
  .get((req, res) => {
    Comment.find({}, (err, comment) => {
      if (err) {
        res.status(400).json(err)
      }
      res.json(comment)
    })
  })

module.exports = router