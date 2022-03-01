import { createContext, ReactNode, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { api } from "../services/api";

interface User {
    id: string;
    name: string;
    birthday: string;
    gender: string;
}

type SignCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn: (credentials: SignCredentials) => Promise<boolean>;
    // signOut: () => void;
    user: User;
    // isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    // const isAuthenticated = !!user;

    async function signIn({ email, password }: SignCredentials) {
        try {
            const response = await api.post('/auth/sign-in', {
                email,
                password
            });

            setCookie(undefined, 'ioasys.token', response.headers["authorization"], {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });
            setCookie(undefined, 'ioasys.refreshToken', response.headers["refresh-token"], {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });

            const { id, name, birthdate, gender } = response.data;

            setUser({ id, name, birthday: birthdate, gender })

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
        <AuthContext.Provider value={{ signIn, user }}>
            {children}
        </AuthContext.Provider>
    )

}