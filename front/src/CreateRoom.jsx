import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateRoom(){
    const roomCode = Math.floor(Math.random() * 1000000).toString()
    const [playerName, setPlayerName] = useState('')
    const navigate = useNavigate()

    const createRoom = (e)=>{
        e.preventDefault()
        navigate("/lobby/"+roomCode, {state: {player_name:playerName, is_host:true}})
    }

    return(
        <>
        <h2>Creating a room</h2>
        <form onSubmit={createRoom}>
            <input type="text" 
            placeholder="Enter your name"
            required
            value={playerName}
            onChange={(e)=>setPlayerName(e.target.value)}
            />
            <button>Create</button>
        </form>
        </>
    )
}

export default CreateRoom