const brain = require('brain.js')
const fs = require('fs')
const path = require('path')

module.exports =  function getTrainData(json, text){
    const file = "./public/data_train.json"
    fs.writeFileSync(file, JSON.stringify(json), "utf-8")

    const dataJson = JSON.parse(fs.readFileSync(file, "utf-8").toString());
    console.log(dataJson)

    const network = new brain.recurrent.LSTM();
    network.fromJSON(dataJson)
    console.log(network == null)
}

