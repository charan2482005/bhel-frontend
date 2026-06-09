function Navbar({ setPage }) {

  return (

    <div style={{
      display: 'flex',
      gap: '10px',
      margin: '20px 0'
    }}>

      <button onClick={() => setPage('sale')}>
        Sale Order
      </button>

      <button onClick={() => setPage('tender')}>
        Tender Enquiry
      </button>

    </div>
  );
}

export default Navbar;