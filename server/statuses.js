const Client = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://127.0.0.1:27017"

let error = msg => {
    return { "error": msg }
}

const statuses = {
    getAll: function() {
      return new Promise((resolve, reject)=>{
        let res;

        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                return error(err.message)
            }

            const db = client.db("theWall")
            const collection = db.collection("statuses")
            collection.aggregate([{ $sort : { timestamp : 1} }, { $limit : 30 } ] ).toArray((err, docs) => {
                client.close()
                if(err) {
                    console.log(err)
                    res = error(err.message)
                    return true
                }
                res = docs
                resolve(res)
                console.log(res);
            })
        });
      });
    },
    get: function(req) {
        let statusId = req.params.id
        return "You got me!"
    },
    createOrUpdate: function(req) {

      const status_data = req

      return new Promise((resolve, reject)=>{
        let res, query;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                return error(err.message)
            }
            const db = client.db("theWall")
            const collection = db.collection("statuses")
            if (status_data._id){
                query = {_id: ObjectId(status_data._id)};
            }else{
                query = { _id: ObjectId(0)};
            }

            collection.updateOne(query, {
                $set:
                {
                    text: status_data.text,
                    author: status_data.author,
                    timestamp: status_data.timestamp,
                    likes: status_data.likes,
                    comments: status_data.comments
                }
            }, { upsert: true }, function(err, res){
                console.log(res)
                console.log(err)
              resolve(JSON.stringify(res))
            })
        })
      });



    },
    remove: function(id, callback) {
        let res;

        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                callback(error(err.message))
            }

            const db = client.db("theWall")
            const collection = db.collection("statuses")

            try {
                collection.deleteOne(ObjectId(id))
                callback({ msg: "Succesfully deleted status with id " + id })
            }
            catch(err) {
                client.close()
                callback(error(err.message))
            }
        })
    }
}

module.exports = statuses
