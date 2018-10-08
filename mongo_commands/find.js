const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'theWall';  // Database Name
const collectionNames = ['users', 'statuses'];
const ObjectID = require('mongodb').ObjectID;


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = {};
  var proj = {projection: { _id: 1, text: 1, author: 1, timestamp: 1, }}
  dbo.collection(collectionNames[1]).find(query, proj).toArray(function(err, result) {
    if (err) throw err;
    console.log(result)
    console.log(`Found ${result.length} documents. Change projection to view specific data.`)
    db.close();
  });
});


console.log("shutdown")
