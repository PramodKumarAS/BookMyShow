import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import User from './Pages/User'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/user' element={<User/>}></Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
