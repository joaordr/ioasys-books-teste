
import { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '../../contexts/AuthContext';

import { BsArrowBarRight } from "react-icons/bs";

import styles from './header.module.scss';

export default function Header() {
    const { signOut, user, isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.container}>
            <span><Image className={styles.logo} src="/images/logo2.png" alt="logo" width={90} height={35} /><p>Books</p></span>
            <div>
                <p>Bem vindo, <strong>{user.name}</strong></p>
                {/* <button onClick={signOut}><Image src="/images/shape.svg" alt="signOut" width={6} height={17} /><Image src="/images/shape2.svg" alt="signOut2" width={13} height={12} /></button> */}
                <button onClick={signOut}><BsArrowBarRight /></button>

            </div>
        </div>
    )
}