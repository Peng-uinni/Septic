const express = require('express')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const http = require('http')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

//vars for stuff
const PORT = 3000
const pageDir = path.join(__dirname, "..", "front", "dist")
const lobby_rooms = {}

//middleware
app.use(express.json())
app.use(express.static(pageDir))

//socket io code
io.on('connection', (socket) => {
    console.log("user connected")
    socket.on('join_room', (data)=>{
        console.log("joined: "+data)
    })

    socket.on('message', (data)=>{
        console.log(data.message)
        socket.emit('message', data)
    })

    socket.on('disconnect', (data)=>{
        console.log("disconnect " + data)
    })
})

//routes
app.get('/*splat', (req, res)=>{
    res.sendFile(path.join(pageDir, "index.html"))
})



server.listen(PORT, ()=>{
    console.log('http://localhost:3000')
})