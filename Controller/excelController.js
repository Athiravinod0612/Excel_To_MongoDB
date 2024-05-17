const csv = require('csvtojson');
const User = require('../Model/excel.js');
const XLSX = require('xlsx');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs')
const excelFile = async (req, res) => {
    try {
        if (req.file?.filename == null || req.file?.filename === 'undefined') {
            res.status(400).json('No file');

        } else {

            var dir = process.cwd()
            var filePath = dir + '/public/uploads/' + req.file.filename;

            const excelData = await excelToJson({
                sourceFile: filePath,
                header: { rows: 1 },
                columnToKey: {

                    A: 'Name',
                    B: 'Age',
                    C: 'Place',
                    D: 'Occupation',
                },
            })

            const userData = excelData.Sheet1.map(row => ({
                name: row.Name,
                age: row.Age,
                place: row.Place,
                occupation: row.Occupation,
            }));

            // if (userData.length === 0) {
            //     return res.status(400).json('No data to insert');
            // }

            await User.insertMany(userData)
            res.status(200).json(excelData)
        }


    } catch (error) {
        res.send({ status: 400, error })
    }
}

var importExcel = async (req, res) => {
    try {
        var userData = []
        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                console.log(response)

                for (var x = 0; x < response.length; x++) {
                    userData.push({
                        name: response[x].Name,
                        age: response[x].Age,
                        place: response[x].Place,
                        occupation: response[x].Occupation,
                    })
                }
                await User.insertMany(userData)
            })
        res.send({ status: 400, msg: " Sccessfull" })

    }
    catch (error) {
        res.send({ status: 400, error })
    }
}


module.exports = {
    importExcel,
    excelFile
}