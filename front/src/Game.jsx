import { useState, useEffect } from "react"
import WaitRoom from "./Game/WaitRoom"
import PromptPhase from "./Game/PromptPhase"

function Game({socket, isHost, roomCode}){
    const [isStarted, setIsStarted] = useState(false)
    const [players, setPlayers] = useState([]) //list of players in the lobby
    const [playerPrompt, setPlayerPrompt] = useState('') //player prompt

    useEffect(()=>{
        socket.on("player-sync", (p)=>{
            setPlayers(p)
        })

        socket.on("game-start", ()=>{
            setIsStarted(true)
        })
    }, [])

    const startGame = ()=>{
        setIsStarted(true)
        socket.emit("start", roomCode)
        console.log("game started")
    }

    if(!isStarted){
        return(
        <>
        <WaitRoom 
        startGame={startGame}
        isHost={isHost}
        players={players}
        />
        </>
        )
    }

    return(
        <>
        Game start stuff here
        </>
    )
}

export default Game