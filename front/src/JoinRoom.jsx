import ReactDOM from "react-dom/client"
import { StrictMode, useState } from "react"
import { useNavigate } from "react-router-dom"

function JoinRoom(){
    const [roomCode, setRoomCode] = useState('')
    const navigate = useNavigate()

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        if(roomCode) navigate(`/lobby/${roomCode}`)
    }

    return(
        <>
        <form onSubmit={formSubmitHandler}>
        <div>
            Add decor here
        </div>
        <div>
            <input type="text" 
            value={roomCode} 
            placeholder="Room Code" 
            onChange={(e)=>setRoomCode(e.target.value)}/>
            <button>Join</button>
        </div>
        </form>
        </>
    )
}

export default JoinRoom