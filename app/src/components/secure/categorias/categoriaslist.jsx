import React, { useState, useEffect } from 'react';
import projectsService from "../../../services/catgorias.service";
import { Link } from 'react-router-dom';

const Categoriaslist = () => {
    const [categorias, setStudents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await projectsService.getAll();
            setStudents(data.data);
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

                    <Link to={"/Categoria"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.map((categoria, index) => (
                            <tr key={categoria.id}>
                                <td >{categoria.idcateg}</td>
                                <td>{categoria.nomecat}</td>
                                <td>
                                    <div className="d-flex justify-content">
                                        <Link to={`/categoria/${categoria.idcateg}`} className='btn btn-primary me-2'>Editar</Link>
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

export default Categoriaslist;