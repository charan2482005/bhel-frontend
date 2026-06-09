import React, { useState, useEffect } from 'react';

import Login from './Login';
import Home from './Home';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const loggedIn = localStorage.getItem("isLoggedIn");
    const loginTime = localStorage.getItem("loginTime");

    if (loggedIn && loginTime) {

      const elapsedTime = Date.now() - Number(loginTime);

      // 10 minutes = 600000 ms
      if (elapsedTime < 600000) {

        setIsLoggedIn(true);

      } else {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loginTime");

      }

    }

  }, []);

  useEffect(() => {

    if (isLoggedIn) {

      const timer = setTimeout(() => {

        alert("Session expired. Please login again.");

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loginTime");

        setIsLoggedIn(false);

      }, 600000); // 10 minutes

      return () => clearTimeout(timer);

    }

  }, [isLoggedIn]);

  return (

    <div>

      {
        isLoggedIn
          ? <Home setIsLoggedIn={setIsLoggedIn} />
          : <Login setIsLoggedIn={setIsLoggedIn} />
      }

    </div>

  );

}

export default App;