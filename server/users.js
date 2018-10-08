const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'theWall';  // Database Name
const collectionNames = ['users', 'statuses'];

let error = msg => {
    return { "error": msg }
}

const users = {
    getAll: function(callback) {
      MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        let resultArray = [];
        let dbo = db.db(dbName);
        let query = {};
        let cursor = dbo.collection(collectionNames[0]).find(query).limit(1000);
        cursor.forEach(function(doc, err){
          resultArray.push(doc);
        }, function(){
          db.close();
          console.log(resultArray);
          callback(resultArray); // can't simply return a value from an asynchronous function call. Thats why a callback was needed here (https://stackoverflow.com/questions/42235886/express-res-send-is-not-returning-the-result-of-my-module-exported-function-that)
        });
      });
    },
    get: function(req) {
        let statusId = req.params.id
        return "You got me!"
    },
    createOrUpdate: function(req) {
        return "You made me!"
    },
    remove: function(req) {
        let statusId = req.params.id
        return "Goodbye, dad!"
    }
}

module.exports = users
