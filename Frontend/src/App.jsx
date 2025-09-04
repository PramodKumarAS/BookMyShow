import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import User from './Pages/User'
import ProtectedRoute from './Pages/ProtectedRoute'
import Admin from './Pages/Admin'
import Partner from './Pages/Partner'
import { Provider } from 'react-redux'
import store from './Redux/store'
import SingleMovie from './Pages/SingleMovie'
import BookShow from './Pages/BookShow'
import './App.css'
import Profile from './Pages/Profile'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<ProtectedRoute allowedRoles={['User']}><User/></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute allowedRoles={['Admin']}><Admin/></ProtectedRoute>} />
          <Route path='/partner' element={<ProtectedRoute allowedRoles={['Partner']}><Partner/></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute allowedRoles={['User']}><Profile/></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute allowedRoles={['User']}><SingleMovie /></ProtectedRoute>} />
          <Route path="/book-show/:id" element={<ProtectedRoute allowedRoles={['User']}><BookShow /></ProtectedRoute>} />
        </Routes>
     </BrowserRouter> 
    </Provider>
  )
}

export default App