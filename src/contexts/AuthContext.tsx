import { createContext, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { api } from "../services/api";

interface User {
    id: string;
    name: string;
    birthday: string;
    gerder: string;
}


export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User>();
    // const isAuthenticated = !!user;

    async function signIn({ email, password }) {
        try {
            const response = await api.post('/auth/sign-in', {
                email,
                password
            });

            setCookie(undefined, 'ioasys.token', response.headers["Authorization"], {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });
            setCookie(undefined, 'ioasys.refreshToken', response.headers["refresh-token"], {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });


            console.log(response);

            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ signIn }}>
            {children}
        </AuthContext.Provider>
    )

}