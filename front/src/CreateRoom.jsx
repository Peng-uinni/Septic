import { useState } from "react"
import io from "socket.io-client"

function CreateRoom(){
    const [roomCode, setRoomCode] = useState(() => Math.floor(Math.random() * 1000000))

    const startButton = (e)=>{
        e.preventDefault()
        console.log("start not implemented")
    }

    return(
        <>
        <div>
            Room Code: {roomCode}
        </div>
        <div>
            People In Da Room
        </div>
        <div>
            <button onClick={startButton}>Start</button>
        </div>
        </>
    )
}

export default CreateRoom