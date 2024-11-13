
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Navbar.css';

export default function Navbar({ onAuthModeChange, isLoggedIn, onLogout }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    onLogout(); 
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      
      <Link to="/" className="navbar-title">RepoRedar</Link>
      <div className="navbar-buttons">
        {isLoggedIn && (
          <Link to="/saved-repos" className="navbar-button saved-repo">Saved Repo</Link> 
        )}
        {isLoggedIn ? (
          <button className="navbar-button logout" onClick={handleLogout}>Logout</button> 
        ) : (
          <>
            <button className="navbar-button login" onClick={() => onAuthModeChange('login')}>Login</button>
            <button className="navbar-button signup" onClick={() => onAuthModeChange('signup')}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}



