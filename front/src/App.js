import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRouter from './pages/Public/PublicRouter'
import AdminRouter from './pages/Admin/AdminRouter'
import AuthRoute from './pages/Auth/authRoute'
import AuthGuard from './_utils/authGuard'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter/>} />
          <Route path="/admin/*" element={
            <AuthGuard>
              <AdminRouter/>
            </AuthGuard>
          } />
          <Route path="/auth/*" element={<AuthRoute/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App