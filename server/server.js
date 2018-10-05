const express = require("express")
const app = express()
const cors = require("cors")

const users = require("./users.js")
const statuses = require("./statuses.js")

const PORT = 3000

const API_DESC = `
API Usage
GET /                   - Display the homepage 
GET /api/users          - Get all users
GET /api/user/:id       - Get user by id
GET /api/statuses       - Get all statuses
GET /api/status/:id     - Get status by id

PUT /api/user?          - Create or update user using querystring, firstName, lastName, email, avatar
PUT /api/status?        - Create or update status using querystring, ???? data

DELETE /api/users/:id   - Delete user by id
DELETE /api/status/:id  - Delete status by id
`

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/api", (req, res) => {
    res.send(API_DESC)
})

app.get("/api/users", (req, res) => {
    res.send(users.getAll())
})

app.get("/api/user/:id", (req, res) => {
    res.send(users.get(req))
})

app.get("/api/statuses", (req, res) => {
    res.send(statuses.getAll())
})

app.get("/api/status/:id", (req, res) => {
    res.send(statuses.get(req))
})

app.put("/api/user", (req, res) => {
    res.send(users.createOrUpdate(req))
})

app.put("/api/status", (req, res) => {
    res.send(statuses.createOrUpdate(req))
})

app.delete("/api/user", (req, res) => {
    res.send(users.remove(req))
})

app.delete("/api/status", (req, res) => {
    res.send(statuses.remove(req))
})

app.listen(PORT, () => {
    console.log("Listening to port", PORT);
})