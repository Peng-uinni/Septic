
import { useNavigate } from "react-router-dom"

import { useState } from "react"


function JoinRoom(){
    const [playerName, setPlayerName] = useState('')
    const [roomCode, setRoomCode] = useState('')
    const navigate = useNavigate()

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        if(roomCode) navigate(`/lobby/${roomCode}`, {state: {"player_name":playerName}})
    }

    return(
        <>
        <form onSubmit={formSubmitHandler}>
        <div>
            Add decor here or the room code idk
        </div>
        <div>
            <input type="text" 
            value={playerName}
            placeholder="Enter your name"
            required
            onChange={(e)=>setPlayerName(e.target.value)}/>

            <input type="text" 
            value={roomCode} 
            required
            placeholder="Enter the room code" 
            onChange={(e)=>setRoomCode(e.target.value)}/>

            <button>Join</button>
        </div>
        </form>
        </>
    )
}

export default JoinRoom