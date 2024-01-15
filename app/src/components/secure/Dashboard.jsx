import React from "react";
import AuthService from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    const logOut = () => {
        AuthService.logout();
        navigate('/');
    };

    return (
        <main>
            <div className="p-1 mb-4 bg-body-tertiary rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">ola {currentUser}</h1>
                    <p className="col-md-8 fs-4">como estar hoje?</p>
                    <div className="d-flex justify-content">
                        <button className="btn btn-danger btn-lg px-4" onClick={logOut}>Terminar sessão</button>

                        <Link to={'/categ-list'} className="btn btn-info btn-lg px-4 mx-2">
                            Categorias
                        </Link>
                        <Link to={'/students-list'} className="btn btn-info btn-lg px-4 mx-2">
                            projetos
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;