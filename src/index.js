import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminColaborator from "./components/Admin/AdminColaborator";
import Login from "./components/Login/Login";
import SelectorRol from "./components/SelectorRol/SelectorRol";
import OrdersApi from "./components/Waiter/OrdersApi";
import PruebaCruds from "./components/Waiter/PruebaCruds";
import CookView from "./components/CookView/CookView";
import WaiterOrders from "./components/Waiter/WaiterOrders";
import PrivateRoute from "./router/PrivateRoute";
import ManageOptions from "./components/Admin/ManageOptions";
import AdminProducts from "./components/Admin/AdminProducts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      

      <Route path="/SelectorRol" element={
        <PrivateRoute>
          <SelectorRol />
        </PrivateRoute>} />
      <Route path="/PruebaCruds" element={
        <PrivateRoute>
          <PruebaCruds />
        </PrivateRoute>
      } />
      <Route path="/OrdersApi" element={
        <PrivateRoute>
          <OrdersApi />
        </PrivateRoute>
      } />
      <Route path="/CookView" element={
        <PrivateRoute>
          <CookView />
        </PrivateRoute>
      } />
      <Route path="/WaiterOrders" element={
        <PrivateRoute>
          <WaiterOrders />
        </PrivateRoute>
      } />
      <Route path="/AdminColaborator" element={
        <PrivateRoute>
          <AdminColaborator />
        </PrivateRoute>
      } />
      <Route path="/ManageOptions" element={
        <PrivateRoute>
          <ManageOptions />
        </PrivateRoute>
      } />
      <Route path="/AdminProducts" element={
        <PrivateRoute>
          <AdminProducts />
        </PrivateRoute>
      } />
    </Routes>
  </BrowserRouter>
);
