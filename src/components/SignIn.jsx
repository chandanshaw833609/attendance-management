import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginEmployee } from "../API/config";
import { CircularProgress } from "@mui/material";

const SignIn = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      setIsLoading(true);
      const response = await loginEmployee(data);
      setIsLoading(false);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 403) setError("Invalid Details");
      else setError(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    setError("");
  };

  return (
    <div className="h-dvh flex items-center justify-center p-5 backdrop-blur-md">
      <img
        className="absolute md:relative object-cover w-full md:h-auto md:w-1/2 h-full"
        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
        alt=""
      />
      <section className="bg-gray-50 z-10 dark:bg-gray-950 w-[450px] rounded-xl overflow-hidden">
        <div className="w-full bg-white  overflow-hidden shadow  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-start text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(login)}
            >
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
                  {...register("email", { required: "Email is required" })}
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-red-600 h-1 mb-5">
                {error ? error : errors.password?.message}
              </p>
              <div className="flex items-center justify-end">
                <Link
                  to={"/generate-otp"}
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className=" text-white h-10 w-32 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="warning" />
                ) : (
                  "Sign In"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
