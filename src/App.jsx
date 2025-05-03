import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard'
import { ToastContainer } from 'react-toastify'
import AuthPages from './pages/auth pages/authPagesTemplate'
import SignOut from './pages/auth pages/signOut'


function App() {
  return (
    <div className='font-montserrat'>
      <>
      <ToastContainer
      bodyClassName={() => "flex items-center text-xs "}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AuthPages />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/sign-out" element={<SignOut />} />
        </Routes>
      </BrowserRouter>
      </>
    </div>
  )
}

export default App
