import React, { useState } from 'react';

import Login from './Login';

import Home from './Home';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    <div>

      {

        isLoggedIn ?

        <Home setIsLoggedIn={setIsLoggedIn} />

        :

        <Login setIsLoggedIn={setIsLoggedIn} />

      }

    </div>

  );

}

export default App;