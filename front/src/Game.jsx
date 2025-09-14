import { useState, useEffect } from "react"

function Game({socket, isHost}){
    const [isStarted, setIsStarted] = useState(false)
    const [players, setPlayers] = useState([]) //list of players in the lobby
    const [playerPrompt, setPlayerPrompt] = useState('') //player prompt

    useEffect(()=>{
        socket.on('prompt', (data)=>{
            
        })

        socket.on('')
    }, [])

    const startGame = ()=>{
        setIsStarted(true)
        console.log("game started")
    }

    return(
        <>
        <WaitRoom 
        startGame={startGame}
        isHost={isHost}
        />
        </>
    )
}

function WaitRoom({startGame, isHost}){
    return(
        <>
        {isHost && <button onClick={startGame}>Start</button>}
        <div id="players-waiting">
            Add some text here 
            <div>Player 1</div>
            <div>Player 2</div>    
        </div>
        </>
    )
}

export default Game