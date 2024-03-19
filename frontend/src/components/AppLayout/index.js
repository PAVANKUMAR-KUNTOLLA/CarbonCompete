import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Api from "../Api";

import Navbar from "./Navbar";

const AppLayout = () => {


  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
          <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
