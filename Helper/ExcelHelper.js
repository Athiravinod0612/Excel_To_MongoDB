const bodyParser = require('body-parser')
var multer = require('multer')
var path = require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})

module.exports = {
    upload
}