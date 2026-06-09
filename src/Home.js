import React from 'react';

import TenderEnquiry from './TenderEnquiry';

function Home({ setIsLoggedIn }) {

  return (

    <div>

      <div
        style={{
          backgroundColor: '#003366',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          fontSize: '40px',
          fontWeight: 'bold'
        }}
      >
        BHEL - HPVP MARKETING
      </div>

     <TenderEnquiry setIsLoggedIn={setIsLoggedIn} />

    </div>

  );

}

export default Home;