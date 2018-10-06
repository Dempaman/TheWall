error = msg => {
    return { "error": msg }
}

const users = {
    getAll: function() {
        return "You got us!"
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

module.exports = {
    users
}