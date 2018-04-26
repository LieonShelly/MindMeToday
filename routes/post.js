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
var pool = require('../Tool/database')
var Share = require('../model/share')
var pool = require('../Tool/database')
var ResponseModel = require('../model/response')

router.post('/add_post', (req, res) => {
    const content = req.body.content
    const imageUrl = req.body.image_url
    const postDate = req.body.post_date
    const userId = req.body.user_id
    const shareEntity = new Share(imageUrl,"fuck", "fuck me now", "https:www.google.com")
    const shareString = JSON.stringify(shareEntity)
    const imageUrlStr = JSON.stringify(imageUrl)
    const query = "INSERT INTO post(content, image_url, post_date, user_id, share_entity) VALUES (?, ?, ?,?,?);"
    pool.query(query, [content, imageUrlStr, postDate, userId, shareString], (err, resluts, fields) => {
        var response = new ResponseModel(0,"success")
        if (err) {
            response.code = -1
            response.message = JSON.stringify(err)
            res.json(response)
        }else {
            res.json(response)
        }
    })
})

module.exports = router