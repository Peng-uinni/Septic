import { useState, useEffect, useInsertionEffect } from "react"

function EndPhase({socket, isHost}){
    const [prompts, setPrompts] = useState([]) //contains objects of player and prompt
    const [promptIndex, setPromptIndex] = useState(null)
    const [dispPrompts, setDispPrompts] = useState([])
    const [receivedPrompts, setReceivedPrompts] = useState(false)

    useEffect(()=>{
        socket.emit("get-prompts");

        socket.on("get-prompts", (prompts)=>{
            //gets an array
            setPrompts(prompts)
            setReceivedPrompts(true)
        })

        socket.on("show-prompts", (i)=>{
            //get index of the next prompt to be show
            //non host side only signal
            setPromptIndex(i)
        })
    }, [socket])

    useEffect(()=>{
        if(!isHost && promptIndex < prompts.length && promptIndex !== null){
            setDispPrompts(prev => [ ...prev, prompts[promptIndex] ])
        }
    }, [promptIndex, receivedPrompts])
    
    if(!receivedPrompts){
        return(
            <>
            Fetching data...
            </>
        )
    }

    const nextPrompt = ()=>{
        //the prajju syntax works *skull-emoji*
        if(promptIndex === null) setPromptIndex(0)
        else setPromptIndex(prev => prev + 1)
        if(promptIndex < prompts.length && prompts[promptIndex]){
            setDispPrompts(prev => [ ...prev, prompts[promptIndex] ])
            if(isHost) socket.emit("show-prompts", promptIndex)
        }
    }

    return(
        <>
        <h1>Stuff to show other stuff</h1>
        {/* The prompts cycle here */}
        {dispPrompts.map((p, i)=>{
            return(
                <div>
                {p.player}:  {p.prompt}
                </div>
            )
        })}

        {isHost && <button onClick={nextPrompt}>Show</button>}
        </>
    )
}

export default EndPhase