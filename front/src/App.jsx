import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Index from './Index.jsx'
import JoinRoom from './JoinRoom.jsx'
import ChatRoom from './ChatRoom.jsx'
import './App.css'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index></Index>}></Route>
      <Route path='/join' element={<JoinRoom></JoinRoom>}></Route>
      <Route path='/chat/:roomcode' element={<ChatRoom></ChatRoom>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
