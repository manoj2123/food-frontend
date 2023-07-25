import React, { useState } from 'react';
import Base from '../Base/Base';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    
    const userDetail = {
      email,
      password,
      confirmPassword,
    };
    console.log(userDetail)

    try {
      
      const response = await fetch('https://food-backend-qake.onrender.com/user/signup', {
        method: 'POST',
        body: JSON.stringify(userDetail),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data)

      if (data.token) {
        setError('');
        localStorage.setItem('token', data.token);
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error)
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Base>
      <div className="main">
        <h1>Sign Up</h1>
        <div className="signup-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </Base>
  );
};

export default SignupPage;