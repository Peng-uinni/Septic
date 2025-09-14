import { useState, useEffect } from "react"

function EndPhase({socket}){
    const [prompts, setPrompts] = useState([]) //contains objects of player and prompt
    const [promptIndex, setPromptIndex] = useState(0)
    const [dispPrompts, setDispPrompts] = useState([])
    const [receivedPrompts, setReceivedPrompts] = useState(false)

    useEffect(()=>{
        socket.emit("get-prompts");
        socket.on("get-prompts", (prompts)=>{
            //gets an array
            setPrompts(prompts)
            setReceivedPrompts(true)
        })
    }, [socket])

    if(!receivedPrompts){
        return(
            <>
            Fetching data...
            </>
        )
    }

    const nextPrompt = ()=>{
        
    }

    return(
        <>
        <button onClick={nextPrompt}></button>
        </>
    )
}

export default EndPhase