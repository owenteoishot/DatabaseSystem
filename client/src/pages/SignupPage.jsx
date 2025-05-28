import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!regex.test(value)) {
      return 'Username must be 3-30 characters (letters, numbers, underscores)';
    }
    return '';
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update state
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);

    // Validate in real-time
    if (name === 'username') {
      setErrors({...errors, username: validateUsername(value)});
    }
    if (name === 'email') {
      setErrors({...errors, email: validateEmail(value)});
    }
    if (name === 'password') {
      setErrors({...errors, password: validatePassword(value)});
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Final validation before submit
    const validationErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password)
    };
    
    setErrors(validationErrors);
    
    if (Object.values(validationErrors).some(error => error !== '')) {
      return; // Don't submit if there are errors
    }

    try {
      const data = await registerUser(username, email, password);
      if (data.user) {
        alert('Signup successful! You can now log in.');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      alert('An error occurred during signup');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={username}
            pattern="^[a-zA-Z0-9_]{3,30}$"
            title="Username must be 3-30 characters and use only letters, numbers, and underscores. (with no spaces)"
            placeholder="Username"
            onChange={handleChange}
            required
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            required
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            required
            minLength="8"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" disabled={Object.values(errors).some(error => error !== '')}>
          Sign Up
        </button>
      </form>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
}

export default SignupPage;