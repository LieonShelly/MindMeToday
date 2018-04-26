/**
    统一返回的数据格式
{
    "code": "0",
    "message": "success",
    "data": {
        
    }
}
 */
class Response {
    constructor(code, message, data) {
        this.code = code
        this.message = message
        this.data = data
    }
}

module.exports = Response
