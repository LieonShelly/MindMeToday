
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
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

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

router.post('/signup', (req, res) => {
    // 检查用户是否存在
    var response = new Response(0,"sucess")
    const phone_num = req.body.phone_num
    checkExistUser(phone_num)
    .then((results) => {
        if(results.length == 0) {
            return createNewUser(req)
        } else {
            response.code = -1
            response.message = "user already exist"
            res.json(response)
        }
    })
    .then(results => {
        response.code = 0
        response.data = results
        res.json(response)
    })
    .catch((error) => {

    })

    // 生成用户（手机号校验）
  
  
})

router.post('/login', (req, res) => {
    // 1. 从数据库中查找用户是否存在
    // 2. 校验密码是否正确npm install jsonwebtoken
})

function checkExistUser(phoneNum) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM user WHERE phone_num = ?;"
        pool.query(query, [phoneNum], (err, resluts, fields) => {
            console.log("checkExistUser:" + phoneNum)
            if(err) {
                rejject(err)
            } else {
                resolve(resluts)
            }
            console.log("checkExistUser:" + JSON.stringify(resluts));
        })
    })
  
}

function createNewUser(req) {
   return new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password,10, (err, hash) => {
            if(err) {
                reject(err)
            } else {
                var username = req.body.username
                var phone_num = req.body.phone_num
                var icon_url = req.body.icon_url
                var community_name = req.body.community_name
                var community_id = req.body.community_id
                var userType = req.body.userType 
                const query = "REPLACE INTO user (username, password, phone_num, icon_url, community_name, community_id, userType)  VALUES(?, ?, ?, ?, ?, ?, ?);"
                pool.query(query, [username, hash, phone_num, icon_url, community_name, community_id, userType], (err, results, fields) => {
                    if(err) {
                       reject(err)
                    } else {
                        var token = jwt.sign(
                                         {
                                            "username": username,
                                            "phone_num": phone_num,
                                         }, 
                                        'secret',
                                        {
                                            expiresIn: '1h'
                                        }
                                    )
                      resolve({
                          "username": username,
                          "phone_num": phone_num,
                          "icon_url": icon_url,
                          "community_name": community_name,
                          "community_id": community_id,
                          "userType": userType,
                          "token": token
                      })
                    }
                })
            }
        })
    })
}

module.exports = router
