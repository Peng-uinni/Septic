import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import ChatRoom from "./ChatRoom"

function GameRoom(){
    const location = useLocation()
    const roomCode = useParams()
    const { player_name, is_host } = location.state
    
    console.log({navigateData})
    return(
        <>
        <ChatRoom></ChatRoom>
        </>
    )
}

export default GameRoom