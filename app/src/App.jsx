import React, {  } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PrivateRoutes from "./utils/privateRoute";
import PublicRoutes from "./utils/publicRoute";

//PUBLIC ROUTES
import Home from "./components/public/Home";
import Login from "./components/public/Login";
import Register from "./components/public/Register";

//PRIVATE ROUTES
import Dashboard from "./components/secure/Dashboard";
import StudentsList from "./components/secure/students/StudentsList";
import Student from "./components/secure/students/Student";
import CategoriaList from "./components/secure/categorias/categoriaslist";
import Categorias from "./components/secure/categorias/categoria";

import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";

const App = () => {
return (
    <div>
    <div className="container mt-3">
    <Header /> 
        <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student" element={<Student />} />
            <Route path="/students-list" element={<StudentsList />} />
            <Route path="/student/:idprojeto" element={<Student />} />
           
            <Route path="/Categoria" element={<Categorias />} />
            <Route path="/categ-list" element={<CategoriaList/>} />
            <Route path="/Categoria/:idcateg" element={<Categorias />} /> 

            <Route path='*'element={<Navigate to="/dashboard" />} />
        </Route>

        <Route element={<PublicRoutes />}>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />}  />
        </Route>
        </Routes>
        <Footer /> 
    </div>
    </div>
);
};

export default App;