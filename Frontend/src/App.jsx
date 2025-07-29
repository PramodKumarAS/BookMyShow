import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import User from './Pages/User'
import ProtectedRoute from './Pages/ProtectedRoute'
import Admin from './Pages/Admin'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/user' element={<ProtectedRoute allowedRoles={['User']}><User/></ProtectedRoute>} />
      <Route path='/admin' element={<ProtectedRoute allowedRoles={['Admin']}><Admin/></ProtectedRoute>} />
    </Routes>
  )
}

export default App