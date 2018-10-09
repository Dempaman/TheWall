const Client = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://127.0.0.1:27017"


let error = msg => {
    return { "error": msg }
}

const users = {
    getAll: function() {
      return new Promise((resolve, reject)=>{

        let res;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                return error(err.message)
            }

            const db = client.db("theWall")
            const collection = db.collection("users")

            collection.find({}).toArray((err, docs) => {
                client.close()
                if(err) {
                    console.log(err)
                    res = error(err.message)
                    return true
                }

                res = docs
                resolve(res)
            })
        })
      });


        //return res || error("Could not get users, database is empty")
    },
    get: function(req) {
        let statusId = req.params.id
        return "You got me!"
    },
    createOrUpdate: function(req) {

      const user_data = req.body

      return new Promise((resolve, reject)=>{
        let res;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                return error(err.message)
            }
            const db = client.db("theWall")
            const collection = db.collection("users")
            if (user_data._id){
              const query = {_id: ObjectID(user_data._id)};
            }else{
              const query = {};
            }

            collection.updateOne(query, {
              $set: {friends: user_data.friends, first_name: user_data.first_name, last_name: user_data.last_name, url: user_data.url, email: user_data.email}
            }, { upsert: true }, function(res, err){
              console.log(res)
              console.log(err)
              resolve(res)
            })
        })
      });
    },
    remove: function(req) {
        let res;

        let statusId = req.params.id
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err)
                return error(err.message)
            }

            const db = client.db("theWall")
            const collection = db.collection("users")

            try {
                collection.deleteOne(ObjectId(statusId))

                client.close()
                res = { msg: "Succesfully deleted user with id", statusId }
            }
            catch(err) {
                client.close()
                res = error(err.message)
            }
        })

        return res
    }
}

module.exports = users
