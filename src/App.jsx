import { useEffect, useState } from "react";
import "./App.css";
import { Dashboard } from "./employee/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded_token = jwtDecode(token);
      const role = decoded_token?.role.authority;
      if (role !== "ROLE_USER" || role !== "ROLE_ADMIN") {
        navigate("/")
      } 
    } else {
      navigate("/login")
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
