import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SavedRepo.css'; 

export default function SavedRepo() {
  const [savedRepos, setSavedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSavedRepos();
  }, []);

  const fetchSavedRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to view saved repositories');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/saved-repos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedRepos(response.data); 
    } catch (error) {
      setError('Failed to fetch saved repositories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: '100px' }}>Saved Repositories</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="repo-list">
        {savedRepos.map((repo) => (
          <li key={repo._id} className="repo-item">
            <h2>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h2>
            <p>{repo.description || 'No description available'}</p>
            <span className="star-count">⭐ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
