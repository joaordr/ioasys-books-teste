import axios from 'axios';
import { parseCookies } from 'nookies';


export function apiAuth() {
    const cookies = parseCookies(undefined);

    const api = axios.create({
        baseURL: 'https://empresas.ioasys.com.br/api/v1/',
        headers: {
            'access-token': `${cookies['ioasys.access-token']}`,
            'client': `${cookies['ioasys.client']}`,
            'uid': `${cookies['ioasys.uid']}`,

        }
    })

    return api;
}