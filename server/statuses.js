let error = msg => {
    return { "error": msg }
}

const statuses = {
    getAll: function() {
        return "You got us!"
    },
    get: function(req) {
        let userId = req.params.id
        return "You got me!"
    },
    createOrUpdate: function(req) {
        return "You made me!"
    },
    remove: function(req) {
        let userId = req.params.id
        return "Goodbye, dad!"
    }
}

module.exports = statuses
