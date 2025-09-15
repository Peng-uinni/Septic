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

//middleware
app.use(express.json())
app.use(express.static(pageDir))

//socket io code
const rooms = new Map()
const socketToRooms = new Map()

io.on('connection', (socket) => {
    socket.on('join_room', (data)=>{
        socket.join(data.roomcode)
        if(!rooms.has(data.roomcode)){
            rooms.set(data.roomcode, {
                players: [data.player_name]
            })
        } else {
            rooms.get(data.roomcode).players.push(data.player_name)
        }
        socketToRooms.set(socket.id, {roomcode: data.roomcode, player: data.player_name})

        io.to(data.roomcode).emit("player-sync", rooms.get(data.roomcode).players)

        console.log("[CLIENT JOIN] "+data.player_name+" joined room "+data.roomcode)
    })

    socket.on('message', (data)=>{
        io.to(data.roomcode).emit('message', data)
        console.log("[MESSAGE "+data.roomcode+"]"+data.player_name+": "+data.message)
    })

    socket.on('start', (roomcode)=>{
        console.log("[START] "+roomcode)
        io.to(roomcode).emit('game-start')
    })

    socket.on('prompt-submit', (prompt)=>{
        const playerData = socketToRooms.get(socket.id)
        if(playerData){
            playerData.prompt = prompt
            socketToRooms.set(socket.id, playerData)
            const room = rooms.get(playerData.roomcode)

            if(!room.prompts){
                room.prompts = []
                room.prompts.push(playerData)
            }
            else{
                room.prompts.push(playerData)
            }
            rooms.set(playerData.roomcode, room)
        }
    })

    socket.on("get-prompts", ()=>{
        const code = socketToRooms.get(socket.id).roomcode
        const p = rooms.get(code).prompts
        socket.emit("get-prompts", p)
    })

    socket.on("show-prompts", (promptIndex)=>{
        console.log("[SHOW] "+socketToRooms.get(socket.id).roomcode)
        socket.to(socketToRooms.get(socket.id).roomcode).emit("show-prompts", promptIndex)
    })

    socket.on('disconnect', ()=>{
        const playerData = socketToRooms.get(socket.id)
        if(playerData){
            const { roomcode, player } = playerData
            const room = rooms.get(roomcode)
            console.log("[DISCONNECT] "+player+" disconnected from "+roomcode)
            room.players = room.players.filter(p => p != player)
            io.to(roomcode).emit("player-sync", rooms.get(roomcode).players)
        }

        socketToRooms.delete(socket.id)
    })
})

//routes
app.get('/*splat', (req, res)=>{
    res.sendFile(path.join(pageDir, "index.html"))
})



server.listen(PORT, ()=>{
    console.log('http://localhost:3000')
})