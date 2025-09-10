const express = require('express')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const lobby_rooms = {}

//socket io code
io.on('connection', (socket) => {
    socket.on('join_room', (data)=>{
        console.log(data)
    })
})