import axios from "axios";

const API_URL = "http://localhost:4242/api/utilizadoresProgeto/";

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

const createORupdate = (idutliPej, nomeutliP) => {
    if (id == null) {
        return create(nomeutliP);
    }
    else {
        return update(idutliPej,nomeutliP);
    }
};

const create = ( nomeutliP) => {
    return axios.post(API_URL + "create", { nomeutliP });
};

const update = (nomeutliP) => {
    return axios.put(API_URL + "update", { nomeutliP });
};

const deleteUser = (idutliPej) => {
    return axios.delete(API_URL + "delete/" + idutliPej);
};

const utilizadorProjetoService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default utilizadorProjetoService;