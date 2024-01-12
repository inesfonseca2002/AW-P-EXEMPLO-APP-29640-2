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

const createORupdate = (idutliPeg, nomeutliP) => {
    if (id == null) {
        return create(nomeutliP);
    }
    else {
        return update(idutliPeg,nomeutliP);
    }
};

const create = ( nomeutliP) => {
    return axios.post(API_URL + "create", { nomeutliP });
};

const update = (nomeutliP) => {
    return axios.put(API_URL + "update", {nomeutliP });
};

const deleteUser = (idutliPeg) => {
    return axios.delete(API_URL + "delete/" + idutliPeg);
};

const utilizadorProgetoService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default utilizadorProgetoService;