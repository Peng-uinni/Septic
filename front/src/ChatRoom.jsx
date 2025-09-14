import { useEffect, useState } from "react"

function ChatRoom({socket, roomCode, playerName}){
    const [ currentMessage, setCurrentMessage ] = useState('')
    const [ messages, setMessages ] = useState([])

    useEffect(()=>{
        socket.on('message', (data)=>{
            setMessages(prevMes => {
                return [ ...prevMes, data ]
            })
        })

        return ()=>{
            socket.off("message")
        }
    }, [])

    const messageInput = (e)=>{
        e.preventDefault()
        socket.emit('message', {
        "message":currentMessage,
        "roomcode":roomCode,
        "player_name":playerName
        })
        setCurrentMessage('')
    }

    return (
        <>
        <div>Room Code: {roomCode}</div>

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