import { useEffect, useState , useRef } from "react"

function ChatRoom({socket, roomCode, playerName}){
    const [ currentMessage, setCurrentMessage ] = useState('')
    const [ messages, setMessages ] = useState([])
    const messagesEndRef = useRef(null);

    const scrollToBottom =()=>{
        messagesEndRef.current?.scrollIntoView({ behaviour:"smooth"});
    };

    useEffect(()=>{
        socket.on('message', (data)=>{
            setMessages(prevMes => {
                return [ ...prevMes, data ]
            })
        })

        return ()=>{
            socket.off("message");
        };
    }, []);

    useEffect(()=>{
        scrollToBottom();
    },[messages]);
    

    const messageInput = (e)=>{
        e.preventDefault()
        socket.emit('message', {
        "message":currentMessage,
        "roomcode":roomCode,
        "player_name":playerName
        })
        setCurrentMessage('')
    }

    return (
        <div className="flex flex-col h-full">
      {/* Scrollable messages area */}
      <div className="flex-1 overflow-y-auto">
        <h4 className="font-semibold text-lg mb-2">Messages</h4>
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <span className="font-bold">{m.player_name}: </span>
            <span>{m.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed input form at the bottom */}
      <div className="mt-2">
        <form onSubmit={messageInput} className="flex space-x-2">
          <input
            value={currentMessage}
            type="text"
            placeholder="Message"
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;