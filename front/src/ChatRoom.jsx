import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"

function ChatRoom(){
    const { roomcode } = useParams()
    const socket = useRef(null)

    const [ currentMessage, setCurrentMessage ] = useState('')
    const [ messages, setMessages ] = useState([])

    useEffect(()=>{
        socket.current = io("http://localhost:3000")

        socket.current.emit('join_room', {"code":roomcode})

        socket.current.on('message', (data)=>{
            setMessages(prevMes => {
                return [ ...prevMes, data.message ]
            })
        })

        return ()=>{
        if(!socket.current) socket.current.disconnect()
        }
    }, [roomcode])


    const messageInput = (e)=>{
        e.preventDefault()
        socket.current.emit('message', {"message":currentMessage})
        setCurrentMessage('')
    }

    return (
        <>
        <div id="roomcode">Room Code: {roomcode}</div>
        <div id="messages">
            <h4>Messages</h4>
            {messages.map((message, index)=>(
                <div>{message}</div>
            ))}
        </div>
        <form onSubmit={messageInput}>
            <input 
            value={currentMessage}
            type="text"
            placeholder="Message"
            onChange={(e)=>setCurrentMessage(e.target.value)}
            />
            <button>Send</button>
        </form>
        </>
    )
}

export default ChatRoom