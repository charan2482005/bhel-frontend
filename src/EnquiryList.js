import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function EnquiryList() {

  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const enquiriesPerPage = 15;
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {

    try {

      const response = await axios.get(
        "https://bhel-complaint-system.onrender.com/api/hpvp/all"
      );

      setEnquiries(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(

      enquiries.map((item, index) => ({

        SLNO: index + 1,
        HPVP_ENQ_NO: item.hpvp_enq_no,
HPVP_ENQ_DATE: item.hpvp_enq_date,
SECTOR: item.sector,
CUST_ENQ_REF: item.cust_enq_ref,
CUSTOMER: item.customer,
DESCRIPTION: item.description,
QTY: item.qty,
WEIGHT_MT: item.weight_mt,
BID_SUB_DUE: item.bid_sub_due,
OFFER_DATE: item.offer_date,
STATUS: item.status,
REMARKS: item.remarks

      }))

    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Tender Enquiries"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array"
      }
    );

    const data = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    );

    saveAs(data, "TenderEnquiries.xlsx");

  };
  const filteredEnquiries = enquiries.filter((item) =>
  item.hpvp_enq_no?.toLowerCase().includes(search.toLowerCase()) ||
  item.customer?.toLowerCase().includes(search.toLowerCase()) ||
  item.sector?.toLowerCase().includes(search.toLowerCase()) ||
  item.status?.toLowerCase().includes(search.toLowerCase())
);
const indexOfLast = currentPage * enquiriesPerPage;

const indexOfFirst =
  indexOfLast - enquiriesPerPage;

const currentEnquiries =
  filteredEnquiries.slice(
    indexOfFirst,
    indexOfLast
  );

const totalPages =
  Math.ceil(
    filteredEnquiries.length /
    enquiriesPerPage
  );
const formatDateTime = (date) => {
  if (!date) return "-";

  const d = new Date(date);

  const datePart = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const timePart = d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return (
    <>
      <div>{datePart}</div>
      <div
        style={{
          fontSize: "12px",
          color: "#666",
          marginTop: "4px"
        }}
      >
        {timePart}
      </div>
    </>
  );
};
  return (

    <div style={{ padding: "20px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >

        <h2>All Tender Enquiries</h2>
       <input
  type="text"
  placeholder="Search by Enquiry No, Customer, Sector, Status"
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }}
  style={{
    padding: "10px",
    width: "450px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px"
  }}
/>
        <button
          onClick={downloadExcel}
          style={{
            background: "#003366",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Download Excel
        </button>

      </div>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>

            <th>SLNO</th>
            <th>HPVP ENQ NO</th>
            <th>HPVP ENQ DATE</th>
            <th>SECTOR</th>
            <th>CUST ENQ REF</th>
            <th>CUSTOMER</th>
            <th>DESCRIPTION</th>
            <th>QTY</th>
            <th>WEIGHT MT</th>
            <th>BID SUB DUE</th>
            <th>OFFER DATE</th>
            <th>STATUS</th>
            <th>REMARKS</th>
            <th>DOCUMENT</th>

          </tr>

        </thead>

        <tbody>

          {currentEnquiries.map((item, index) => (

            <tr key={index}>

              <td>
  {indexOfFirst + index + 1}
</td>

             <td>{item.hpvp_enq_no}</td>

<td>{formatDateTime(item.hpvp_enq_date)}</td>

<td>{item.sector}</td>

<td>{item.cust_enq_ref}</td>

<td>{item.customer}</td>

<td>{item.description}</td>

<td>{item.qty}</td>

<td>{item.weight_mt}</td>

<td>{formatDateTime(item.bid_sub_due)}</td>

<td>{formatDateTime(item.offer_date)}</td>

<td>{item.status}</td>

<td>{item.remarks}</td>

              <td>

                {item.document_name ? (
  <a
    href={`https://bhel-complaint-system.onrender.com/uploads/${item.document_name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View File
                  </a>

                ) : (

                  "No File"

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px"
  }}
>

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(currentPage - 1)
    }
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
  >
    Next
  </button>

</div>
    </div>

  );

}

export default EnquiryList;