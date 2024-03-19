import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import HomePage from "../views/Home/home.page";
import AddProduct from "../views/Home/addProduct";
import ProductView from "../components/productView";
import EditProduct from "../views/Home/editProduct";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate replace to="/app/home" />} />

      {/* App routes */}
      <Route path="/app/*" element={<AppLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="productview/:id" element= {<ProductView  />} />
        <Route path="editProduct/:id" element= {<EditProduct />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
