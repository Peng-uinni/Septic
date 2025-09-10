import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"

function ChatRoom(){
    const { roomcode } = useParams()
    const socket = useRef(null)

    useEffect(()=>{
        socket.current = io("http://localhost:3000")

        console.log(roomcode)

        socket.current.emit('join-room', {"code":roomcode})
        console.log("joined "+roomcode)
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
        <h2>More Poop</h2>
        </>
    )
}

export default ChatRoom