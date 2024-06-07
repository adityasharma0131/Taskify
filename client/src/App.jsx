import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("http://localhost:3000/login/success", {
          withCredentials: true,
        });
        setIsLoggedIn(response.data.user ? true : false);
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false); // Set loading to false when done checking login status
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      {loading ? ( // Display loading indicator while checking login status
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='/dashboard/profile' element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path='*' element={<Error />} />
        </Routes>
      )}
    </>
  );
}

export default App;

