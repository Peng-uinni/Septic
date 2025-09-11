import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Index from './Index.jsx'
import JoinRoom from './JoinRoom.jsx'

import './App.css'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index></Index>}></Route>
      <Route path='/join' element={<JoinRoom></JoinRoom>}></Route>
     
    </Routes>
    </BrowserRouter>
  )
}

export default App