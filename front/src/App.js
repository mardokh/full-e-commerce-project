import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRouter from './pages/Public/PublicRouter'
import AdminRouter from './pages/Admin/AdminRouter'
import AdminAuthGuard from './_utils/adminAuthGuard'
import UserAuthGuard from './_utils/userAuthGuard'
import UserRoutes from './pages/User/userRoutes'
import LoginRegister from './pages/Admin/LoginRegister'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter/>} />
          <Route path="/admin/*" element={<AdminAuthGuard><AdminRouter/></AdminAuthGuard>} />
          <Route path='/auth/admin' element={<LoginRegister/>}/>
          <Route path='/user/*' element={<UserAuthGuard><UserRoutes/></UserAuthGuard>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App