import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import Landing from './Pages/Landing'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import { Routes,Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/auth' element={<Auth/>}></Route>
      <Route path='/dash' element={<Dashboard/>}></Route>
    </Routes>
    {/* <h1>Student Mangement</h1> */}
    <ToastContainer/>
    </>
  )
}

export default App
