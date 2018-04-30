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
var UserInfo = require('../model/userInfo')

router.post('/add_post', (req, res) => {
    const content = req.body.content
    const imageUrl = req.body.image_url
    const postDate = req.body.post_date
    const userId = req.body.user_id
    const shareEntity = new Share(imageUrl,"fuck", "fuck me now", "https:www.google.com")
    const shareString = JSON.stringify(shareEntity)
    const imageUrlStr = JSON.stringify(imageUrl)

    var response = new ResponseModel(0,"success")
    queruserInfo(userId).then((user) => {
        let uerStr = JSON.stringify(user)
        return uerStr
    }).then((userStr) => {
       return  insertPost([content, imageUrlStr, postDate, userId, shareString, userStr])
    }).then((result) => {
        response.code = 0
        response.data = JSON.parse(JSON.stringify(result))
        res.json(JSON.stringify(response))
    })
    .catch((error) => {
        response.code = -1
        response.message = JSON.stringify(error)
        res.json(JSON.stringify(response))
    })
}) 

router.get('/post_list', (req, res) => {
    const page = req.query.page
    const num = req.query.num
    var response = new ResponseModel(0,"success")
    queryPostlist(page, num).then((lists) => {
        console.log("Success")
        response.data = lists
        res.json(response)
   })
   .catch((err) => {
        response.code = -1
        response.message = JSON.stringify(err)
        response.data = null
        res.json(JSON.stringify(response))
   })
})

function insertPost(value)  { // 
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO post(content, image_url, post_date, user_id, share_entity, user_info) VALUES (?, ?, ?,?,?,?);"
        pool.query(query, value, (err, resluts, fields) => {
            if (err) {
                reject(err)
            }else {
                resolve(resluts)
            }
        })
    })
 
}

function queryPostlist (page, num) {
    return new Promise((resolve, reject) => {
        const query = "SELECT DISTINCT * from post LIMIT ?, ?; "
        var queryPage = 0
        if(Number(page) == 1) {
            queryPage = 0
        } else {
            queryPage = Number(page) * Number(num)
        }
        pool.query(query,[queryPage, Number(num)],  (err, resluts, fields) => {
            if(err && (Array(resluts)).length == 0 && Array.isArray(resluts)) {
                reject(err)
                console.log(err)
            } else {
                resluts.forEach(element => {
                    element.image_url = JSON.parse(element.image_url)
                    element.share_entity = JSON.parse(element.share_entity)
                    element.user_info = JSON.parse(element.user_info)
                });
                resolve(resluts)
                console.log(resluts)
            }
        })
    })
}

function queruserInfo(userId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT DISTINCT icon_url, username from user WHERE user_id = ?;"
        pool.query(query,[userId],  (err, resluts, fields) => {
            if(err) {
                reject(err)
            } else {
                resolve(resluts[0])
            }
        })
    })
}

module.exports = router