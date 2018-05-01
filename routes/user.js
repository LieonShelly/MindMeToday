/**
 * user API
{
    "user_id":1,
    "username": "lieon",
    "phone_num: "15608066219",
    "password":"2312wada@***",
    "icon_url": "https:hader.jpg",
    "community_name":"QingShuiYard",
    "community_id": 11,
    "userType": "phone_num", // phone_num. wechat, qq, weibo,
    "otherInfo":"adsfdsfs",
    "is_delete":0,
    "friends":[{
        user_id:123
    }]
}

SQL: 

ALTER TABLE `demo`.`user` 
DROP COLUMN `id`,
DROP COLUMN `last_name`,
DROP COLUMN `first_name`,
ADD COLUMN `username` VARCHAR(16) NULL DEFAULT '小可爱' AFTER `user_id`,
ADD COLUMN `phone_num` VARCHAR(16) NULL AFTER `username`,
ADD COLUMN `password` VARCHAR(256) NULL AFTER `phone_num`,
ADD COLUMN `icon_url` VARCHAR(45) NULL AFTER `password`,
ADD COLUMN `community_name` TEXT(256) NULL AFTER `icon_url`,
ADD COLUMN `community_id` INT NOT NULL AFTER `community_name`,
ADD COLUMN `userType` ENUM('phone_num', 'wechat', 'qq', 'weibo') NULL DEFAULT 'phone_num' AFTER `community_id`,
ADD COLUMN `otherInfo` VARCHAR(45) NULL AFTER `userType`,
ADD COLUMN `is_delete` TINYINT NULL DEFAULT 0 AFTER `otherInfo`,
ADD COLUMN `friends` VARCHAR(45) NULL AFTER `is_delete`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`user_id`),
ADD UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC);

 */

var express = require('express')
var router = express.Router()
var pool = require('../Tool/database')
var Response = require('../model/response')

router.get('/users', (req, res) => {
    pool.query("SELECT DISTINCT last_name, first_name, user_id FROM user ORDER BY last_name;", (err, results) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.json(results)
    });
});

router.post('/user_create', (req, res) => {
    var username = req.body.username
    var phone_num = req.body.phone_num
    var icon_url = req.body.icon_url
    var community_name = req.body.community_name
    var community_id = req.body.community_id
    var userType = req.body.userType 

    const query = "REPLACE INTO user (username, phone_num, icon_url, community_name, community_id, userType)  VALUES(?, ?, ?, ?, ?, ?);"
    var response = new Response(0, 'success', req.body)
    pool.query(query, [username, phone_num, icon_url, community_name, community_id, userType], (err, results, fields) => {
        if(err) {
            response.code = -1
            response.message = JSON.stringify(err)
            response.data = null
            res.json(response)
        } else {
            res.json(response)
        }

    })
})

module.exports = router
