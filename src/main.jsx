import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Dashboard } from "./employee/Dashboard.jsx";
import Employee from "./employee/Employee.jsx";
import SignIn from "./components/SignIn.jsx";
import GenerateOtp from "./components/GenerateOtp.jsx";
import SignUp from "./components/SignUp.jsx";
import VerifyOtp from "./components/VerifyOtp.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/generate-otp" element={<GenerateOtp />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/profile" element={<Employee/>} />
      <Route path="/login" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RouterProvider>
  </QueryClientProvider>
);
