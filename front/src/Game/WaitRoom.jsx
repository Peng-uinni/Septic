function WaitRoom({ startGame, isHost, players }) {
  return (
    <div className=" h-full p-6">
      

      <h2 className="text-xl font-semibold mb-2">Players In Room</h2>

      
      <div className="bg-gray-300 rounded-lg h-64 overflow-y-auto p-2">
        {players.length > 0 ? (
          players.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-md shadow-sm px-3 py-2 mb-2 text-left"
            >
              {p}
            </div>
          ))
        ) : (
          <p className="text-gray-600 italic m-[50%]">Waiting for players...</p>
        )}
      </div>
      {isHost && (
        <button
          onClick={startGame}
          className="mt-40 ml-[50%] px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Start
        </button>
      )}
    </div>
  );
}

export default WaitRoom; 