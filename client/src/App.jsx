import React from 'react'
import './App.css'
import Header from './components/Header'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Error from './components/Error'
import Home from './components/Home'
import Login from './components/Login'

const App = () => {
  return (
    <>
    <Header />
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