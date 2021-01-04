   const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'headsOfStateDB';
// Collection Name
const collName = "headsOfState";

var headsOfStateDB
var headsOfState

//connect to url and to object (mongodb 4.0 version and upwords) require to set both 
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then((client) => {
    headsOfStateDB = client.db(dbName)
    headsOfState = headsOfStateDB.collection(collName)
})
// Fail to connect
.catch((error) => {
    console.log(error)

})
//list Head of States function which uses Promise 
var getListHeadOfStates = function(){
    return new Promise((resolve, reject) => {
        var curser = headsOfState.find()
        curser.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
//adding Head of States function which uses Promise 
var addHeadOfStates = function(_id, headOfState) {
    return new Promise((resolve, reject) => {
        headsOfState.insertOne({"_id":_id, "headOfState":headOfState})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
//export functions getListHeadOfStates, addHeadOfStates
module.exports = { getListHeadOfStates, addHeadOfStates }
