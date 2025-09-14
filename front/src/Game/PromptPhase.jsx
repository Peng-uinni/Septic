import { useEffect, useState } from "react"
import EndPhase from "./EndPhase"

function PromptPhase({socket, duration}){
    const [prompt, setPrompt] = useState("")
    const [timeLeft, setTimeLeft] = useState(duration)
    const [isTime, setIsTime] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)

    useEffect(()=>{
        if(timeLeft <= 0){
        setIsTime(true)
        socket.emit('prompt-submit', prompt)
        return;
        }

        const timer = setTimeout(()=>{
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return ()=>{
            clearTimeout(timer)
        }
    }, [timeLeft])

    const buttonHandler = (e)=>{
        e.preventDefault()
        setButtonDisable(!buttonDisable)
    }

    if(isTime){
        return(
            // The next part goes here
            <>
            <EndPhase
            socket={socket}
            />
            </>
        )
    }

    return(
        <>
        {/* Gonna add a round theme or something later maybe*/}
        <div>{timeLeft}</div>
        <form>
            <p>Enter something funny</p>
            <input 
            type="text" 
            placeholder="Enter your thingy"
            value={prompt}
            onChange={(e)=>{setPrompt(e.target.value)}}
            disabled={buttonDisable}
            />
            <button onClick={buttonHandler}>Enter</button>
        </form>
        </>
    )
}

export default PromptPhase