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
         <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold">Game Room</h1>
        <p className="mt-2 text-gray-600">
          
        </p>

        <div className="mt-6 h-96 bg-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-lg text-gray-700">[ Your Game Canvas Here ]</p>

          <Game socket={socket.current} isHost={is_host} roomCode={roomCode} />
        </div>
      </div>

      {/* The chat container needs to be a flexbox with a full height */}
      <div className="w-80 bg-white shadow-lg border-l p-4 flex flex-col h-full">
        <h2 className="font-semibold text-xl ">Chat</h2>
        <ChatRoom
          socket={socket.current}
          roomCode={roomCode}
          playerName={player_name}
        />
      </div>
    </div>
  );
}

export default GameRoom;

        
       /* <>
        
        <Game
        socket={socket.current}
        isHost={is_host}
        roomCode={roomCode}
        />
        <hr /> 
        <ChatRoom 
        socket={socket.current}
        roomCode={roomCode}
        playerName={player_name}
        />
        </>
    )
} */

