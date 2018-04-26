var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var index = require('./routes/index')

app.use(bodyParser.json())

app.use('/', index)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(3000 ,() => {
    console.log('listening on port 3000')
})



