import axios from "axios";

const API_URL = "http://localhost:4242/api/auth/";

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getAll = () => {
    return axios.get(API_URL);
};

const getById = (id) => {
    return axios.get(API_URL + id);
};

const createORupdate = (idprojeto, nome, notas, estado, datainicio, datafim, idcat) => {
    if (id == null) {
        return create(nome, notas, estado, datainicio, datafim, idcat);
    }
    else {
        return update(idprojeto, nome, notas, estado, datainicio, datafim, idcat);
    }
};

const create = ( nome, notas, estado, datainicio, datafim, idcat) => {
    return axios.post(API_URL + "create", { nome, notas, estado, datainicio, datafim, idcat });
};

const update = (idprojeto, nome, notas, estado, datainicio, datafim, idcat) => {
    return axios.put(API_URL + "update", {idprojeto, nome, notas, estado, datainicio, datafim, idcat });
};

const deleteUser = (idprojeto) => {
    return axios.delete(API_URL + "delete/" + idprojeto);
};

const StudentsService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default StudentsService;