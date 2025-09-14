function WaitRoom({startGame, isHost, players}){
    return(
        <>
        {isHost && <button onClick={startGame}>Start</button>}
        <div>
            Players In Room
            {
            players.map((p, i) => {
                return <div>{p}</div>
            })
            }   
        </div>
        </>
    )
}

export default WaitRoom