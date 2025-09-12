const express = require('express')
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
        socket.join(data.roomcode)
        console.log("[CLIENT JOIN] "+data.player_name+" joined room: "+data.roomcode)
    })

    socket.on('message', (data)=>{
        io.to(data.roomcode).emit('message', data)
        console.log("[MESSAGE] "+data.message)
    })

    socket.on('disconnect', (data)=>{
        console.log("DC")
    })
})

//routes
app.get('/*splat', (req, res)=>{
    res.sendFile(path.join(pageDir, "index.html"))
})



server.listen(PORT, ()=>{
    console.log('http://localhost:3000')
})