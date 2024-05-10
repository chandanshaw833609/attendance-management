import React from "react";
import { Link, NavLink } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";

function Header() {
  return (
    <header className="flex justify-evenly p-2 shawdow-md border-b bg-green-900 rounded-md font-semibold md:gap-10 md:p-5">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `${isActive ? "bg-green-700  rounded-md" : "bg-green-900"} text-white w-1/2 p-3 md:p-3 `
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to={"/profile"}
        className={({ isActive }) =>
          `${isActive ? "bg-green-700 rounded-md" : "bg-green-900"} text-white w-1/2 p-3 md:p-3 `
        }
      >
        Profile
      </NavLink>
    </header>
  );
}

export default Header;
