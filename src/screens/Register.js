import React, { useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToggleSwitch from "../components/ToggleSwitch";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [role , setRole]  = useState() ;
  const formRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userObj = {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      confirmPassword: formRef.current.confirmPassword.value,
      role: role,
    };
    console.log(userObj) ;
    const token = localStorage.getItem("authToken");


    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/register",
      data: userObj,
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    })
      .then((response) => {
        toast.success("Registered successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.warn(error.response.data.message);
      });
  };

  return (
    <section className="bg-[var(--background)] py-5">
      <div className="  flex flex-col items-center justify-center sm:h-[100%] px-6 py-8 mx-auto  lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              ref={formRef}
              onSubmit={submitHandler}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div className=" flex justify-center">
                <ToggleSwitch setRole={setRole} role={role}/>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Fullname
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                id="button"
              >
                Create an account
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
