import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';


function UsersTable() {
  const [allProducts, setAllProducts] = useState();

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = { headers: { authorization: `Bearer ${token}` } };

      const response = await axios.get(
        "http://localhost:5000/api/user",
        config
      );
      console.log(response.data.data)
      setAllProducts(response.data.data);
    } catch (e) {
      toast.warn(e.response.data.message);
    }
  }
  const customStyles = {
    rows: {
      style: {
        fontSize: "1rem",
      }
    },
    headCells: {
      style: {
        fontSize: "1.5rem",
        fontWeight: "800",
        backgroundColor: "black",
        color: "white"
      }
    },
    cells: {
      style: {
        width: "fit-content"
      }
    }

  }
  useEffect(() => { getUsers(); }, [])


  const columns = [
    {
      name: "Index",
      selector: (row, index) => index + 1,
      maxWidth: "50px"
    },
    {
      name: "Name",
      selector: (row) => row.name
    },
    {
      name: "Email",
      selector: (row) => row.email
    },
    {
      name: "Role",
      selector: (row) => row.role
    },
    {
      name: "Sold",
      selector: (row) => row.totalProductsSold
    }, {
      name: "Cost",
      selector: (row) => row.totalPrice
    }

  ];


  return (
    <div className='   my-auto sm:p-10 md:p-0 '>
      <DataTable columns={columns} data={allProducts} pagination fixedHeader fixedHeaderScrollHeight='700px' highlightOnHover responsive theme='dark' customStyles={customStyles}  />
    </div>
  )
}

export default UsersTable