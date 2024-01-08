import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';


function ProductTable() {
  const [allProducts, setAllProducts] = useState();
  const navigate = useNavigate();;
  const dispatch = useDispatch();
  const getProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = { headers: { authorization: `Bearer ${token}` } };

      const response = await axios.get(
        "http://localhost:5000/api/product/fetchall",
        config
      );

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
        fontWeight: "400",
        backgroundColor: "black",
        color: "white",

      }
    },
    cells: {
      style: {
        width: "fit-content",
        textAlign: "center"
      }
    }

  }
  useEffect(() => { getProducts(); }, [])


  const columns = [
    {
      name: "Index",
      selector: (row, index) => index + 1,
      maxWidth: "50px"
    },


    {
      name: "Product",
      selector: (row) => <div className='flex items-center gap-5'><img src={row.image} alt=" " className='h-[60px] w-[60px] py-2 object-cover' />{row.name}</div>,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      maxWidth: "60px"
    },
    {
      name: "Quantities Left",
      selector: (row) => row.quantityLeft,
    },
    {
      name: "Sold",
      selector: (row) => row.soldQuantity,
      maxWidth: "100px"
    },
    {
      name: "Value",
      selector: (row) => row.price * row.quantityLeft,
      maxWidth: "80px"
    },
    {
      name: "Actions",
      cell: (row) => <div><button id="button" onClick={() => { dispatch(setSelectedProduct(row)); navigate('/info') }}>Info</button></div>
    }
  ];


  return (
    <div className='  my-auto sm:p-10 md:p-0 '>
      <DataTable columns={columns} data={allProducts} pagination fixedHeader fixedHeaderScrollHeight='700px' highlightOnHover responsive theme='dark' customStyles={customStyles} />
    </div>
  )
}

export default ProductTable