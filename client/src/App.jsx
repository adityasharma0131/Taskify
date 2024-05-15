import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Error from './components/Error'
import Home from './components/Home'
import Login from './components/Login'

const App = () => {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<Error />} />
    </Routes>
    </>
  )
}

export default App