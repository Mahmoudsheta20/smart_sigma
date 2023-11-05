import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/ManageProject";
import Dashboard from "./pages/Dashboard";
import ManageEmployee from "./pages/ManageEmployee";
import { StoreContext } from "./context/CreateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "ManageEmployee",
        element: <ManageEmployee />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <StoreContext>
      <RouterProvider router={router} />
    </StoreContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
