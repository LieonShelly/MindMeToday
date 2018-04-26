var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var index = require('./routes/index')
const PORT = process.env.PORT || 3000


app.use(bodyParser.json())

app.use('/', index)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT ,() => {
    console.log('listening on port:' + PORT)
})



