import React, { useState, useEffect } from 'react';
import projectsService from "../../../services/students.service";
import { Link } from 'react-router-dom';

const StudentsList = () => {
    const [students, setprojetos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await projectsService.getAll();
            setprojetos(data.data);
        }

        fetchData();
    }, []);

    return (
        <main>
            <section className="py-4">
                <div className="d-flex justify-content">
                    <Link to={"/"} className="btn btn-secondary px-4 mx-2">
                        Voltar
                    </Link>

                    <Link to={"/student"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">idprojeto</th>
                            <th scope="col">Nome</th>
                            <th scope="col">observaçoes</th>
                            <th scope="col">estado</th>
                            <th scope="col">datainicio</th>
                            <th scope="col">data fim</th>
                            <th scope="col">idcat</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td >{student.idprojeto}</td>
                                <td>{student.nome}</td>
                                <td>{student.notas}</td>
                                <td>{student.estado}</td>
                                <td>{student.datainicio}</td>
                                <td>{student.datafim}</td>
                                <td>{student.idcat}</td>
                                <td>
                                    <div className="d-flex justify-content">
                                        <Link to={`/student/${student.idprojeto}`} className='btn btn-primary me-2'>Editar</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default StudentsList;