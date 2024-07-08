import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "789065330074610",
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });

      window.FB.AppEvents.logPageView();
    };
  },[])
  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={!user?<Login /> : <Navigate to={'/dashboard'}/>} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>

  );
}

export default App;
