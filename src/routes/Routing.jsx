import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../components/Dashboard";

import FuelDashboard from "../components/FuelDashboard";
import Signin from "../components/Signin";

const Routing = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/vehiclelist" />} /> */}
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/fueldashboard" element={<FuelDashboard />} />
      </Routes>
    </>
  );
};

export default Routing;
