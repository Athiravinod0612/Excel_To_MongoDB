var express = require('express')
var app = express()
var path = require('path')
const PORT = 3000
const bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ExcelToDb')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

const excelRoute = require('./Routes/excelRute.js')

app.use('/', excelRoute)


app.listen(PORT, (req, res) => {
    console.log("Server running Port :" + PORT)
})
