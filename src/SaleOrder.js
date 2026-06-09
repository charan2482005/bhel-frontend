import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './SaleOrder.css';

function SaleOrder() {

  const [saleOrders, setSaleOrders] = useState([]);

  useEffect(() => {
    fetchSaleOrders();
  }, []);

  const fetchSaleOrders = async () => {

    const response = await axios.get(
      'https://bhel-complaint-system.onrender.com/api/saleorder/all'
    );

    setSaleOrders(response.data);
  };

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(

      saleOrders.map((item) => ({

        SLNO: item.id,
SALE_ORDER: item.sale_order,
IO_NUMBER: item.io_number,
SECTOR: item.sector,
ENQUIRY_NO: item.enquiry_no,
GROUP: item.group_name,
CUSTOMER: item.customer,
DESCRIPTION: item.description,
QTY: item.qty,
WEIGHT_MT: item.weight_mt,
ZERO_DATE: item.zero_date,
DELIVERY: item.delivery,
DOCS: item.docs

      }))

    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'SaleOrders'
    );

    XLSX.writeFile(workbook, 'SaleOrders.xlsx');
  };
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

    <div style={{ padding: '20px' }}>

      <h2>Sale Order</h2>

      <button
  onClick={downloadExcel}
  className="excel-btn"
>
   Download Excel
</button>

      <br /><br />

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>SLNO</th>
            <th>SALE ORDER</th>
            <th>IO NUMBER</th>
            <th>SECTOR</th>
            <th>ENQUIRY NO</th>
            <th>GROUP</th>
            <th>CUSTOMER</th>
            <th>DESCRIPTION</th>
            <th>QTY</th>
            <th>WEIGHT MT</th>
            <th>ZERO DATE</th>
            <th>DELIVERY</th>
            <th>DOCS</th>
          </tr>

        </thead>

        <tbody>

          {saleOrders.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>
<td>{item.sale_order}</td>
<td>{item.io_number}</td>
<td>{item.sector}</td>
<td>{item.enquiry_no}</td>
<td>{item.group_name}</td>
<td>{item.customer}</td>
<td>{item.description}</td>
<td>{item.qty}</td>
<td>{item.weight_mt}</td>
<td>{formatDateTime(item.zero_date)}</td>
<td>{formatDateTime(item.delivery)}</td>
<td>{item.docs}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default SaleOrder;