
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TenderEnquiry.css';
import SaleOrder from './SaleOrder';
import EnquiryList from "./EnquiryList";

function TenderEnquiry({ setIsLoggedIn }) {

  const [activeTab, setActiveTab] = useState('tender');

  const [formData, setFormData] = useState({
    hpvp_enq_no: '',
    hpvp_enq_date: '',
    sector: '',
    cust_enq_ref: '',
    customer: '',
    description: '',
    qty: '',
    weight_mt: '',
    bid_sub_due: '',
    offer_date: '',
    status: '',
    remarks: '',
    document: null
  });

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {

  const response = await axios.get(
    'https://bhel-complaint-system.onrender.com/api/hpvp/all'
  );

  console.log("ENQUIRIES =", response.data);

};
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      Object.keys(formData).forEach((key) => {

        data.append(key, formData[key]);

      });

      await axios.post(

        'https://bhel-complaint-system.onrender.com/api/hpvp/create',

        data,

        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

      );

      fetchEnquiries();
setActiveTab("view");
      setFormData({
        hpvp_enq_no: '',
        hpvp_enq_date: '',
        sector: '',
        cust_enq_ref: '',
        customer: '',
        description: '',
        qty: '',
        weight_mt: '',
        bid_sub_due: '',
        offer_date: '',
        status: '',
        remarks: '',
        document: null
      });

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div>
      <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 30px"
  }}
>
  <button
    onClick={() => setIsLoggedIn(false)}
    style={{
      background: "#dc3545",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600"
    }}
  >
    Logout
  </button>
</div>

      <div className="top-tabs">

  <button
className={`nav-btn ${activeTab === 'tender' ? 'active' : ''}`}
onClick={() => setActiveTab('tender')}
>
  Tender Enquiry
</button>

  <button
    className={`nav-btn ${activeTab === "sale" ? "active" : ""}`}
    onClick={() => setActiveTab("sale")}
  >
    Sale Order
  </button>

  <button
    className="nav-btn"
  >
    Enlistment
  </button>

  <button
    className="nav-btn"
  >
    Completion Certificate
  </button>

  <button
    className="nav-btn"
  >
    General Document
  </button>

  <button
    className={`nav-btn ${activeTab === "view" ? "active" : ""}`}
    onClick={() => setActiveTab("view")}
  >
    View Enquiries
  </button>

</div>

      {activeTab === 'tender' && (

  <div className="form-card">

    <h2>Tender Enquiry</h2>

    <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="floating-group">
                <input
                  type="text"
                  name="hpvp_enq_no"
                  required
                  placeholder=" "
                  value={formData.hpvp_enq_no}
                  onChange={handleChange}
                />
                <label>HPVP ENQ NO *</label>
              </div>

              <div className="floating-group">
                <input
                  type="date"
                  name="hpvp_enq_date"
                  required
                  placeholder=" "
                  value={formData.hpvp_enq_date}
                  onChange={handleChange}
                />
                <label>HPVP ENQ DATE *</label>
              </div>

              <div className="floating-group">
                <input
                  type="text"
                  name="sector"
                  required
                  placeholder=" "
                  value={formData.sector}
                  onChange={handleChange}
                />
                <label>Sector *</label>
              </div>

              <div className="floating-group">
                <input
                  type="text"
                  name="cust_enq_ref"
                  required
                  placeholder=" "
                  value={formData.cust_enq_ref}
                  onChange={handleChange}
                />
                <label>Customer Ref *</label>
              </div>

              <div className="floating-group">
                <input
                  type="text"
                  name="customer"
                  required
                  placeholder=" "
                  value={formData.customer}
                  onChange={handleChange}
                />
                <label>Customer *</label>
              </div>

              <div className="floating-group">
                <textarea
                  name="description"
                  required
                  placeholder=" "
                  value={formData.description}
                  onChange={handleChange}
                />
                <label>Description *</label>
              </div>

              <div className="floating-group">
                <input
                  type="number"
                  name="qty"
                  required
                  placeholder=" "
                  value={formData.qty}
                  onChange={handleChange}
                />
                <label>Quantity *</label>
              </div>

              <div className="floating-group">
                <input
                  type="number"
                  name="weight_mt"
                  required
                  placeholder=" "
                  value={formData.weight_mt}
                  onChange={handleChange}
                />
                <label>Weight MT *</label>
              </div>

              <div className="floating-group">
                <input
                  type="date"
                  name="bid_sub_due"
                  required
                  placeholder=" "
                  value={formData.bid_sub_due}
                  onChange={handleChange}
                />
                <label>Bid Sub Due *</label>
              </div>

              <div className="floating-group">
                <input
                  type="date"
                  name="offer_date"
                  required
                  placeholder=" "
                  value={formData.offer_date}
                  onChange={handleChange}
                />
                <label>Offer Date *</label>
              </div>

              <div className="floating-group">
                <input
                  type="text"
                  name="status"
                  required
                  placeholder=" "
                  value={formData.status}
                  onChange={handleChange}
                />
                <label>Status *</label>
              </div>

              <div className="floating-group">
                <textarea
                  name="remarks"
                  required
                  placeholder=" "
                  value={formData.remarks}
                  onChange={handleChange}
                />
                <label>Remarks *</label>
              </div>

            </div>

            <div
  style={{
    marginTop: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px"
  }}
>

  <button
    type="submit"
    style={{
      background: "#003366",
      color: "white",
      border: "none",
      padding: "14px 40px",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer"
    }}
  >
    Add Enquiry
  </button>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px"
    }}
  >



   <div className="file-upload-wrapper">

  <label className="custom-file-upload">
     Choose Document

    <input
      type="file"
      onChange={(e) =>
        setFormData({
          ...formData,
          document: e.target.files[0]
        })
      }
    />

  </label>

  <span className="file-name">
    {formData.document
      ? formData.document.name
      : "No file selected"}
  </span>

</div>

  </div>


</div>

          </form>

          

        </div>

      )}

      {activeTab === 'sale' && (
        <SaleOrder />
      )}
{activeTab === 'view' && (
  <EnquiryList />
)}
    </div>

  );

}

export default TenderEnquiry;