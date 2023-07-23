import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./Layout";

function ProtectedRoutes() {
  const token = localStorage.getItem("token");
  const { isLogged } = useSelector((state) => state.auth);

  if (!isLogged && !token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default ProtectedRoutes;
