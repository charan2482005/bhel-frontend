import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login({ setIsLoggedIn }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState('');

  const generateCaptcha = () => {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let result = '';

    for (let i = 0; i < 6; i++) {

      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );

    }

    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async () => {

    if (captchaInput !== captcha) {

      alert('Invalid Captcha');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }

    try {

      const response = await axios.post(
        'https://bhel-complaint-system.onrender.com/api/auth/login',
        {
          email,
          password
        }
      );

      if (response.data.success) {

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loginTime", Date.now());

  setIsLoggedIn(true);

} else {

        alert('Invalid Credentials');

      }

    } catch (error) {

      console.log(error);
      alert('Login Failed');

    }
  };

  return (

    <div>

      <div
        style={{
          backgroundColor: '#003366',
          color: 'white',
          padding: '25px',
          textAlign: 'center',
          fontSize: '42px',
          fontWeight: 'bold'
        }}
      >
        BHEL - HPVP MARKETING
      </div>

      <div
        style={{
          marginTop: '80px',
          textAlign: 'center'
        }}
      >

        <h1
          style={{
            marginBottom: '30px'
          }}
        >
          BHEL Login
        </h1>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '320px',
            height: '45px',
            padding: '0 15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '320px',
            height: '45px',
            padding: '0 15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />

        <br /><br />

        {/* CAPTCHA + REFRESH BUTTON */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px'
          }}
        >

          <div
            style={{
              backgroundColor: '#e5e7eb',
              padding: '15px 35px',
              fontSize: '34px',
              fontWeight: 'bold',
              letterSpacing: '5px',
              textDecoration: 'line-through',
              userSelect: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            {captcha}
          </div>

          <button
            onClick={generateCaptcha}
            title="Refresh Captcha"
            style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#003366',
              color: 'white',
              fontSize: '28px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}
          >
            ↻
          </button>

        </div>

        <br />

        <input
          type="text"
          placeholder="Enter Captcha"
          value={captchaInput}
          onChange={(e) =>
            setCaptchaInput(e.target.value)
          }
          style={{
            width: '320px',
            height: '45px',
            padding: '0 15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />

        <br /><br />

        <button
          onClick={handleLogin}
          style={{
            width: '180px',
            height: '50px',
            backgroundColor: '#003366',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
          }}
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;