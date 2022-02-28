import { createContext, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({children}){
    // const [user, setUser] = useState();
    // const isAuthenticated = !!user;

    async function signIn({email, password}){
        try {
            const response = await api.post('users/auth/sign_in', {
                email,
                password
            });

            setCookie(undefined, 'ioasys.access-token', response.headers["access-token"], {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });
            setCookie(undefined, 'ioasys.client', response.headers["client"], {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });
            setCookie(undefined, 'ioasys.uid', response.headers["uid"], {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });

            // console.log(response);

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