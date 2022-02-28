import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://empresas.ioasys.com.br/api/v1/'
})