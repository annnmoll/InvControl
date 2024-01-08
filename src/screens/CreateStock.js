import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading, loading } from '../redux/slices/loadingSlice';
import Loading from '../components/Loading'

function CreateStock() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const formRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(toggleLoading())
    const productObj = {
      name: formRef.current.name.value,
      image: formRef.current.image.files[0],
      description: formRef.current.description.value,
      price: formRef.current.price.value,
      stock: formRef.current.stock.value
    };
    console.log(productObj);

    const token = localStorage.getItem('authToken')
    await axios({

      method: "post",
      url: "http://localhost:5000/api/product/createProduct",
      files: { file: formRef.current.image.files[0] },
      data: productObj,
      headers: { "Content-Type": "multipart/form-data", authorization: `Bearer ${token}` },
    })
      .then(() => {
        dispatch(toggleLoading())
        toast.success("Created successfully");
        navigate("/");
      })
      .catch((error) => {
        dispatch(toggleLoading())
        toast.warn(error.response.data.message);
      });

  }

  return isLoading ? <Loading /> : <section className="bg-[var(--background)] min-h-[88vh]">
    <div className="flex flex-col items-center justify-center md:h-[100%] px-6 py-8 mx-auto  lg:py-0 ">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create a new stock
          </h1>
          <form
            ref={formRef}
            onSubmit={submitHandler}
            className="space-y-4 md:space-y-6"


          >

            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Shirt"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept='image/*'
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Product Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write something..."
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="1200"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Items to be added
              </label>
              <input
                type="text"
                name="stock"
                id="stock"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <button
              type="submit"
              id="button"
            >
              Create Stock
            </button>

          </form>
        </div>
      </div>
    </div>
  </section>

}

export default CreateStock