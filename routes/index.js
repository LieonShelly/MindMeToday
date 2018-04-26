/**
 * API index
 */
var user = require('./user')
var post = require('./post')
var express = require('express')
var router = express.Router()

router.use(user)
router.use(post)

module.exports = router