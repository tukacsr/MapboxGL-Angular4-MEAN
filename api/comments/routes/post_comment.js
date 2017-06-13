'use strict'

const express = require('express')
const mongoose = require('mongoose')
const Comment = require('../model/Comments')
const router = express.Router()

router.route('/')
  .post((req, res) => {
    const comment = new Comment(req.body)
    comment.save((err, comment) => {
      if (err) {
        res.status(400).json(err)
      }
      res.json(comment)
    })
  })

module.exports = router