

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import RepoList from './components/RepoList';
import Login from './components/Login';
import Signup from './components/Signup';
import SavedRepos from './components/SavedRepos'; 
import './App.css';

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [authMode, setAuthMode] = useState(null);  
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    fetchTopRepos();
  }, [limit]);

  const fetchTopRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/repos?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const data = await response.json();
      setRepos(data.items);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthModeChange = (mode) => {
    setAuthMode(mode);
  };

  const handleLoginSuccess = () => {
    setAuthMode(null);
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  return (
    <div className="app">
      <Navbar 
        onAuthModeChange={handleAuthModeChange} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout} 
      />
      <main className="main-content">
        <Routes>
          <Route path="/saved-repos" element={<SavedRepos />} /> 
          <Route path="/" element={
            authMode === 'login' ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : authMode === 'signup' ? (
              <Signup onSignupSuccess={handleLoginSuccess} />
            ) : (
              <>
                {loading && <p>Loading...</p>}
                {error && <p className="error">Error: {error}</p>}
                {!loading && !error && <RepoList repos={repos} />}
              </>
            )
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
