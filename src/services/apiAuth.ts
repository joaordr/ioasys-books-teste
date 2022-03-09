import axios from 'axios';
import { setCookie, parseCookies } from 'nookies';

import { signOut } from '../contexts/AuthContext';


let isRefreshing = false;
let failedRequestQueue = [];

export function apiAuth() {
    let cookies = parseCookies(undefined);

    const api = axios.create({
        baseURL: 'https://books.ioasys.com.br/api/v1',
        headers: {
            Authorization: `Bearer ${cookies['ioasys.token']}`,
        }
    })

    api.interceptors.response.use(response => { return response; }, (error) => {
        console.log('teste');
        if (error.response.status === 401) {
            cookies = parseCookies(undefined);

            const { 'ioasys.refreshToken': refreshToken } = cookies;
            const originalConfig = error.config;

            if (!isRefreshing) { // impede requisições futuras com token antigo
                isRefreshing = true;
                api.post('/auth/refresh-token', {
                    refreshToken: refreshToken
                }).then(response => {
                    const token = response.headers["Authorization"];
                    const RefreshToken = response.headers["refresh-token"];


                    setCookie(undefined, 'ioasys.token', token, {
                        maxAge: 60 * 60 * 24 * 10, // 10 days
                        path: '/'
                    });
                    setCookie(undefined, 'ioasys.refreshToken', RefreshToken, {
                        maxAge: 60 * 60 * 24 * 10, // 10 days
                        path: '/'
                    });

                    api.defaults.headers['Authorization'] = `Bearer ${token}`;

                    failedRequestQueue.forEach(request => request.onSucess(token));
                    failedRequestQueue = [];
                }).catch(error => {
                    failedRequestQueue.forEach(request => request.onFailure(error));
                    failedRequestQueue = [];
                    signOut();

                }).finally(() => {
                    isRefreshing = false;
                })
            }

            return new Promise((resolve, reject) => { // realiza as requisições que estavam em fila
                failedRequestQueue.push({
                    onSucess: (token: string) => {
                        originalConfig.headers['Authorization'] = `Bearer ${token}`;
                        resolve(api(originalConfig))
                    },
                    onFailure: (error) => {
                        reject(error);
                    },
                })
            })


        }

        return Promise.reject(error);
    })

    return api;
}