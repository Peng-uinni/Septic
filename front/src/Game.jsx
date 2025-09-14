import { useState, useEffect, useRef } from "react"

function Game({socket, isHost}){
    const [isStarted, setIsStarted] = useState(false)
    const [players, setPlayers] = useState([]) //list of players in the lobby
    const [playerPrompt, setPlayerPrompt] = useState('') //player prompt
    const [matchPlayer, setMatchPlayer] = useState(null)

    const startGame = ()=>{
        setIsStarted(true)
        console.log("game started")
    }

    useEffect(()=>{
        socket.on('prompt', (data)=>{
            
        })

        socket.on('')
    }, [])

    return(
        <>
        <WaitRoom startGame={startGame}></WaitRoom>
        </>
    )
}

function WaitRoom({startGame}){
    return(
        <>
        <div id="players-waiting"></div>
        <button onClick={startGame}>Start</button>
        </>
    )
}

export default Game