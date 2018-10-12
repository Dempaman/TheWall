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

            collection.aggregate([{ $sort : { timestamp : -1} }, { $limit : 30 } ] ).toArray((err, docs) => {
                client.close()
                if(err) {
                    console.log(err)
                    res = error(err.message)
                    return true
                }
                res = docs
                resolve(res)
            })
        });
      });
    },
    get: function(req) {
        let statusId = req.params.id
        return "You got me!"
    },
    createOrUpdate: function(req, callback) {

        let status = {
            _id: req.query._id || null,
            text: req.query.text,
            author: req.query.author,
            timestamp: req.query.timestamp || new Date(),
            likes: req.query.likes || [],
            comments: req.query.comments || []
        }

        let query;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                callback(error(err.message))
                client.close()
                return true
            }

            const db = client.db("theWall")
            const collection = db.collection("statuses")

            if (status._id) {
                query = { _id: ObjectId(status._id) };
            } else {
                query = { _id: ObjectId(0) };
            }

            collection.updateOne(query, {
                $set: { text: status.text, author: status.author, timestamp: status.timestamp, likes: status.likes, comments: status.comments }
            }, { upsert: true }, function(err, res) {
                if(err) {
                    callback(error(err.message))
                    client.close()
                    return true
                }

                callback(res)
                client.close()
            })
        })

        /*return new Promise((resolve, reject)=>{
            let query;
            Client.connect(url, { useNewUrlParser: true }, (err, client) => {
                if(err) {
                    console.log(err)
                    return error(err.message)
                }

                const db = client.db("theWall")
                const collection = db.collection("statuses")

                if (status._id) {
                    query = {_id: ObjectId(status._id)};
                } else {
                    query = {};
                }

                console.log(query)

                collection.updateOne(query, {
                    $set: {text: status.text, author: status.author, timestamp: status.timestamp, likes: status.likes, comments: status.comments}
                }, { upsert: true }, function(res, err) {
                    console.log(res)
                    console.log(err)
                    resolve(res)
                })
            })
        });*/
    },
    remove: function(id, callback) {
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                callback(error(err.message))
            }

            const db = client.db("theWall")
            const collection = db.collection("statuses")

            collection.deleteOne({ "_id": ObjectId(id)}, (err) => {
                if(err) {
                    callback(error(err.message))
                }

                callback({ msg: "Succesfully deleted status with id " + id })
            })

            client.close()
        })
    }
}

module.exports = statuses
