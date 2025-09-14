import { useState, useRef, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import ChatRoom from "./ChatRoom"
import Game from "./Game"
import { io } from "socket.io-client"

function GameRoom(){
    const location = useLocation()
    const { player_name, is_host, roomCode } = location.state
    
    const socket = useRef(null)
    const [socketConnected, setSocketConnected] = useState(false)
    
    useEffect(()=>{
        socket.current = io("http://localhost:3000")
        
        socket.current.on("connect", ()=>{
            setSocketConnected(true)
            socket.current.emit('join_room', {
            "roomcode":roomCode,
            "player_name": player_name
            })
        })
        
        return ()=>{
            if(socket.current) socket.current.disconnect()
        }
    }, [])

    if(!socketConnected){
        return(
            <>
            Connecting to game...
            </>
        )
    }
    
    return(
        <>
        <Game
        socket={socket.current}
        isHost={is_host}
        roomCode={roomCode}
        />
        <hr /> {/* Remove this later, is just here so I can see which box is which */}
        <ChatRoom 
        socket={socket.current}
        roomCode={roomCode}
        playerName={player_name}
        />
        </>
    )
}

export default GameRoom