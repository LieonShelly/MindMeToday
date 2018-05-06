
var jwt = require('jsonwebtoken');

exports.createToken = (username, phone_num) => {
    var token =  jwt.sign(
        {
           "username": username,
           "phone_num": phone_num,
        }, 
       'secret',
       {
           expiresIn: '7d'
       }
   )
   return token
}