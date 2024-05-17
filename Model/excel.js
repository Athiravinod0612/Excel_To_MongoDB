const mongoose = require('mongoose')

var excelSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    place: {
        type: String
    }
})

module.exports = mongoose.model('Excel', excelSchema)