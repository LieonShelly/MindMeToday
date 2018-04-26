/**
 *  post API
 {
    "content":"sdfads",
    "image_url": [
        "http:baidu.com/imag.jpg",
        "http:baidu.com/imag.jpg",
    ]
    "post_date":" 2018-02-2",
    "user_id":211,
    "like_num":23,
    "comment_num":sadf,
    "share_entity": {
        "image_url": "http:baidu.com/imag.jpg",
        "title": "title",
        "sub_title": "sub_title",
        "url":"https:wwww.google.com"
    },
    "is_delete":0
 }
 */

var express = require('express')
var router = express.Router();
let pool = require('../Tool/database')

router.post('/add_post', (req, res) => {

})

module.exports = router;