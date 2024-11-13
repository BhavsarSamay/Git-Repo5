
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RepoList.css';

export default function RepoList() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10); 

  
  const fetchTopRepos = async (limit) => {
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

  useEffect(() => {
    fetchTopRepos(limit); 
  }, [limit]); 

  
  const handleSaveRepo = async (repoId, name, description, html_url, stargazers_count) => {
    try {
      const token = localStorage.getItem('token');  
      console.log('Token:', token);
      if (!token) {
        alert('You must be logged in to save a repository');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/save-repo', 
        { repoId, name, description, html_url, stargazers_count },
        {
          headers: {
            Authorization: `Bearer ${token}`  
          }
        }
      );

      alert('Repository saved successfully');
      console.log(response.data);  
    } catch (error) {
      console.error('Error saving repository:', error);
      alert('Error saving repository');
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: '100px' }}>Top GitHub Repositories</h1>
      <div className="controls">
        <label htmlFor="limit">Show:</label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={10}>Top 10</option>
          <option value={50}>Top 50</option>
          <option value={100}>Top 100</option>
        </select>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-item">
            <h2>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h2>
            <p>{repo.description || 'No description available'}</p>
            <span className="star-count">⭐ {repo.stargazers_count}</span>
            <button 
              onClick={() => handleSaveRepo(repo.id, repo.name, repo.description, repo.html_url, repo.stargazers_count)}
              className="save-button"
            >
              Save 
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
