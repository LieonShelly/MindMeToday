var express = require('express')
var router = express.Router()
var pool = require('../Tool/database')

router.get('/users', (req, res) => {
    pool.query("SELECT DISTINCT last_name, first_name  FROM user ORDER BY last_name;", (err, results) => {
        if(err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.json(results)
    });
});

router.post('/user_create', (req, res) => {
    var firstName = req.body.first_name
    var lastName = req.body.last_name
    const query = "REPLACE INTO user (first_name, last_name)  VALUES(?,?);"
    pool.query(query, [firstName, lastName], (err, results, fields) => {
        if(err) {
        console.log("failed to insert new user:" + err)
            res.sendStatus(500)
            return
        }
        res.sendStatus(200);
        res.end()
    })
})

module.exports = router

/**

{
    "username": "lieon",
    "password":"2312wada@***",
    "icon_url": "https:hader.jpg",
    "community_name":"QingShuiYard",
    "community_id": 11,

}

 */