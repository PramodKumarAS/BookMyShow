import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/login' element={<Login/>}></Route>
          </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
