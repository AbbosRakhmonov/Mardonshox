import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import Statistics from "./Features/Statistics/Statistics";
import { useDispatch } from "react-redux";
import { logIn } from "./Features/Auth/authSlice";
import ProtectedRoutes from "./Features/protectedRoutes";

const Dashboard = lazy(() => import("./Features/Dashboard/dashboard"));
const Todos = lazy(() => import("./Features/Todos/todos"));
const Login = lazy(() => import("./Features/Auth/login"));

// const Register = lazy(() => import('./Features/Auth/register'))

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(logIn(token));
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback="loading...">
            <Login />
          </Suspense>
        }
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/"
          element={
            <Suspense fallback="loading...">
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path={"firm/:id"}
          element={
            <Suspense fallback="loading...">
              <Todos />
            </Suspense>
          }
        />
        <Route
          path={"stats"}
          element={
            <Suspense fallback="loading...">
              <Statistics />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to={-1} />} />
      </Route>
    </Routes>
  );
}

export default App;
