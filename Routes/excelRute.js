var express = require('express')
var Router = express()
var excelcontroller = require('../Controller/excelController.js')
const { upload } = require('../Helper/ExcelHelper.js')


Router.get('/', (req, res) => {
    res.send(` <div>
    <h1>Signup</h1>
    <form action="importUser" enctype="multipart/form-data" method="post">
      
        <div>Photo:
            <input type="file" name="file" multiple="multiple" />
        </div>
        <input type="submit" value="Upload" />
    </form>

 
</div>`)
})
Router.post('/importUser', upload.single('file'), excelcontroller.importExcel)

Router.get('/excelFile', (req, res) => {
    res.send(` <div>
    <h1>Signup</h1>
    <form action="/excelFile" enctype="multipart/form-data" method="post">

        <div>Photo:
            <input type="file" name="file" multiple="multiple" />
        </div>
        <input type="submit" value="Upload" />
    </form>


</div>`)
})
Router.post('/excelFile', upload.single('file'), excelcontroller.excelFile)

module.exports = Router