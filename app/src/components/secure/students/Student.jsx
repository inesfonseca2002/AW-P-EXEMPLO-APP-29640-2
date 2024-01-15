import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import StudentsService from "../../../services/students.service";

const Student = () => {
    const navigate = useNavigate();


    const params = useParams();
    const [idprojeto, setidprojeto] = useState(null);
    const [nome, setNome] = useState("");
    const [notas, setNotas] = useState("");
    const [estado, setestedo] = useState("");
    const [datainicio, setdainicio] = useState("");
    const [datafim, setdatafim] = useState("");
    const [idcat, setidcat] = useState("");

    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!params.idprojeto) {
            return;
        }

        async function fetchData() {
            const response = await StudentsService.getById(params.idprojeto);

            setidprojeto(response.data.idprojeto);
            setNome(response.data.nome);
            setNotas(response.data.notas);

            setestedo(response.data.estado);
            setdainicio(response.data.datainicio);
            setdatafim(response.data.datafim);
            setidcat(response.data.idcat);
        }

        fetchData();
    }, []);


    const form = useRef();
    const checkBtn = useRef();

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            StudentsService.createORupdate(idprojeto, nome, notas, estado, datainicio, datafim, idcat).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);

                    setidprojeto(response.data.idprojeto);
                    setNome(response.data.nome);
                    setNotas(response.data.notas);
                    setestedo(response.data.estado);
                    setdainicio(response.data.datainicio);
                    setdatafim(response.data.datafim);
            setidcat(response.data.idcat);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();

        StudentsService.deleteUser(idprojeto).then(
            (response) => {
                navigate('/students-list');
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    }

    const required = (value) => {
        if (!value) {
            return (
                <div className="invalid-feedback d-block">
                    É obrigatório!
                </div>
            );
        }
    };

    const validLength = (value) => {
        if (value.length < 3 || value.length > 50) {
            return (
                <div className="invalid-feedback d-block">
                    O nome deve ter entre 3 e 20 caracteres!
                </div>
            );
        }
    };

    return (
        <main>
            <section>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <Form onSubmit={handleRegister} ref={form} className="col-4">
                            <div>
                                <h1 className="h3 mb-3 fw-normal">Registar</h1>

                                <div className="form-group">
                                    <label>nome</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="nome"
                                        value={nome}
                                        onChange= {(e) => setNome(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>observaçoes</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="notas"
                                        value={notas}
                                        onChange={(e) => setNotas(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>estado do projeto</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="estado"
                                        value={estado}
                                        onChange={(e) => setestedo(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>data inicio</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="datainicio"
                                        value={datainicio}
                                        onChange={(e) => setdainicio(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>data fim</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="datafim"
                                        value={datafim}
                                        onChange={(e) => setdatafim(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>id categoria</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="idcat"
                                        value={idcat}
                                        onChange={(e) => setidcat(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-success mt-2">Registar</button>

                                    {idprojeto && (<button onClick={handleDelete} className="btn btn-danger mt-2 mx-2">
                                        Eliminar
                                    </button>)}

                                    <Link to={"/students-list"} className="btn btn-secondary mt-2 mx-2">
                                        Voltar
                                    </Link>
                                </div>
                            </div>

                            {successful && (
                                <div className="alert alert-success mt-2" role="alert">
                                    Gravado com sucesso!
                                </div>
                            )}


                            {message && successful !== null && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Student;