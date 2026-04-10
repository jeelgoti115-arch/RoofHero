import { RiArrowRightUpLine } from '@remixicon/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = '/api';

const Logbox = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: username, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message || 'Login failed.');
        return;
      }

      localStorage.setItem('roofheroToken', result.token);
      localStorage.setItem('roofheroUser', JSON.stringify(result.user));

      if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'contractor') {
        navigate('/contractor');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login-section'>
      <img src='public/hero-bg.png' alt='logo' className='login-logo'/>

      <div className='login-card'>
        <div className='login-header'>
          <h1><span className='span-login'>RoofHero Login</span> – Access Your Personalized Dashboard</h1>
          <p>Log in with your RoofHero credentials.</p>
        </div>

        <form className='login-form' onSubmit={handleLogin}>
          <div className='input-group'>
            <label htmlFor='username'>User ID / Email / Phone</label>
            <input
              type='text'
              id='username'
              placeholder='Enter your ID or email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <div className='form-error'>{errorMessage}</div>}

          <button type='submit' className='cta-btn-login' disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Log In to My Dashboard'} <RiArrowRightUpLine size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logbox;