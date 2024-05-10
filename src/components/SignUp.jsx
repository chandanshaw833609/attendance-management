import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../API/config";
import { CircularProgress } from "@mui/material";

function SignUp() {
  const [error, setErrors] = useState('')
  const { register, handleSubmit, formState } = useForm();  
  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const create = async (data) => {
    try {
      setIsLoading(true);
      await signUp(data);
      navigate("/login")
    } catch (error) {
      setErrors(error.response.data)
      throw error
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    // Clear the error message when the user starts typing
    setErrors('');
  };

  return (
    <div className="h-dvh flex items-center justify-center p-5 backdrop-blur-md">
    <img className="absolute md:relative object-cover w-full md:h-auto md:w-1/2 h-full" src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="" />
<section className="bg-gray-50 z-10 dark:bg-gray-950 w-[450px] rounded-xl overflow-hidden">
  <div className="w-full bg-white  overflow-hidden shadow  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-start text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(create)}>
      <div>
          <label
            htmlFor="email"
            className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            {...register("name", { required: "Name is required!" })}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-red-600 h-1">{errors.name?.message}</p>
        <div>
          <label
            htmlFor="email"
            className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            {...register("email", {required : "Email is required"})}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-red-600 h-1">{errors.email?.message}</p>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("password", {required : "Password is required"})}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-red-600 h-1">{error ?  error : errors.password?.message}</p>
        

        <div className="flex items-center justify-end">
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-32 h-10 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {isLoading ? <CircularProgress size={20} color="warning"/> : "Sign Up"}
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to = "/login"
            className="font-medium text-blue-600 hover:underline dark:text-primary-500"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  </div>
</section>
</div>
  );
}

export default SignUp;
