import { createContext, ReactNode, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from "next/router";

import { api } from "../services/api";
import { useEffect } from "react";

interface User {
    id: string;
    name: string;
    birthdate: string;
    gender: string;
}

type SignCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn: (credentials: SignCredentials) => Promise<boolean>;
    signOut: () => void;
    user: User;
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export function signOut() {
    destroyCookie(undefined, 'ioasys.token');
    destroyCookie(undefined, 'ioasys.refreshToken');
    destroyCookie(undefined, 'ioasys.user');

    Router.push('/');
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'ioasys.user': user } = parseCookies();

        if (user && user !== 'undefined') {
            setUser(JSON.parse(user));
        } else {
            signOut();
        }

    }, [])

    async function signIn({ email, password }: SignCredentials) {
        try {
            const response = await api.post('/auth/sign-in', {
                email,
                password
            });

            setCookie(undefined, 'ioasys.token', response.headers["authorization"], {
                maxAge: 60 * 60 * 24 * 10, // 10 days
                path: '/'
            });
            setCookie(undefined, 'ioasys.refreshToken', response.headers["refresh-token"], {
                maxAge: 60 * 60 * 24 * 10, // 10 days
                path: '/'
            });

            const { id, name, birthdate, gender } = response.data;

            setUser({ id, name, birthdate, gender })

            setCookie(undefined, 'ioasys.user', JSON.stringify({ id, name, birthdate, gender }), {
                maxAge: 60 * 60 * 24 * 5, // 5 days
                path: '/'
            });

            return true;

        } catch (error) {
            if (error.response.status === 401) {
                return false;
            } else {
                console.log(error.response);
            }

        }
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )

}