import React from "react";
import { Outlet } from "react-router-dom";
import "../App.css"

const MainLayout = () => {
  return (
    <div>
      <h1>MainLayout</h1>
      <Outlet />
    </div>
  );
};

export { MainLayout };
