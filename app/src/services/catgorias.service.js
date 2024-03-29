import axios from "axios";

const API_URL = "http://localhost:4242/api/categorias/";

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

const createORupdate = (idcateg,nomecat) => {
    if (idcateg == null) {
        return create(nomecat);
    }
    else {
        return update(idcateg,nomecat);
    }
};

const create = ( nomecat) => {
    return axios.post(API_URL + "create", { nomecat });
};

const update = (idcateg, nomecat) => {
    return axios.put(API_URL + "update", {idcateg, nomecat });
};

const deleteUser = (idcateg) => {
    return axios.delete(API_URL + "delete/" + idcateg);
};

const categoriasService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default categoriasService;