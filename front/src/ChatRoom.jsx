import { useEffect, useState, useRef } from "react"
import { useParams, useLocation } from "react-router-dom"
import io from "socket.io-client"

function ChatRoom(){
    //getting data from the joinRoom component 
    const { roomcode } = useParams()
    const location = useLocation()
    const playerName = location.state?.player_name

    const socket = useRef(null)

    const [ currentMessage, setCurrentMessage ] = useState('')
    const [ messages, setMessages ] = useState([])

    useEffect(()=>{
        socket.current = io("http://localhost:3000")

        socket.current.emit('join_room', {
            "roomcode":roomcode,
            "player_name": playerName
        })

        socket.current.on('message', (data)=>{
            setMessages(prevMes => {
                return [ ...prevMes, data ]
            })
        })

        return ()=>{
        if(!socket.current) socket.current.disconnect()
        }
    }, [roomcode])


    const messageInput = (e)=>{
        e.preventDefault()
        socket.current.emit('message', {
        "message":currentMessage,
        "roomcode":roomcode,
        "player_name":playerName
        })
        setCurrentMessage('')
    }

    return (
        <>
        <div id="roomcode">Room Code: {roomcode}</div>

        <div id="messages">
            <h4>Messages</h4>
            {messages.map((m, i)=>(
                <div>{m.player_name}: {m.message}</div>
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