import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"

function ChatRoom(){
    const { roomCode } = useParams()
    const socket = useRef(null)

    useEffect(()=>{
        socket.current = io("http://localhost:3000")

        console.log(roomCode)

        socket.current.emit('join-room', {"code":roomCode})
        console.log("joined "+roomCode)
        socket.current.on('msg', (data)=>{
        console.log(data)
        })

        return ()=>{
        if(!socket.current) socket.current.disconnect()
        }
    }, [])

    return (
        <>
        <h1>Poop</h1>
        </>
    )
}

export default ChatRoom