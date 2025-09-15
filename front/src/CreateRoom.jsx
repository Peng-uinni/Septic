import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './index.css'
import Particles from "./Particles"

function CreateRoom(){
    const roomCode = Math.floor(Math.random() * 1000000).toString()
    const [playerName, setPlayerName] = useState('')
    const navigate = useNavigate()

    const createRoom = (e)=>{
        e.preventDefault()
        navigate("/lobby/"+roomCode, {state: {player_name:playerName, is_host:true, roomCode:roomCode}})
    }

    return(

        <div className="w-full h-screen relative bg-black flex justify-center items-center" style={{ width: '100%', position: 'relative' }}>
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.4}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
      />
        

        <form className="absolute z-10 flex flex-col items-center gap-5 
                bg-white/10 backdrop-blur-xl border border-white/30 
                rounded-2xl p-10 shadow-2xl w-[350px] 
                animate-fadeIn" onSubmit={createRoom}>
                    <h2  className="text-2xl font-semibold text-white mb-2 tracking-wide">Creating a room</h2>
            <input type="text" 
            placeholder="Enter your name"
            required
            value={playerName}
            onChange={(e)=>setPlayerName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/30 
                    bg-white/20 backdrop-blur-md text-white placeholder-white/50
                    focus:outline-none focus:ring-2 focus:ring-white 
                    transition duration-300"
            />
            <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r 
                    from-purple-500/70 to-pink-500/70 text-white font-medium
                    border border-white/30 shadow-lg
                    hover:from-purple-500 hover:to-pink-500 
                    hover:scale-105 transition-all duration-300">Create</button>
        </form>
        </div>
    )
}

export default CreateRoom
