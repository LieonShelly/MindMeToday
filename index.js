var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./routes/user')

app.use(bodyParser.json())

app.use(router)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(3000 ,() => {
    console.log('listening on port 3000')
})



