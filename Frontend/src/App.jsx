import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
