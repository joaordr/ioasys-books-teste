/* eslint-disable @next/next/no-img-element */

import Head from 'next/head';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { AuthContext } from '../contexts/AuthContext';

import styles from '../styles/SignIn.module.scss';

export default function SignIn() {
  const [email, setEmail] = useState('desafio@ioasys.com.br');
  const [password, setPassword] = useState('12341234');
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    if (document.cookie) {
      Router.push('/books');
      return null;
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
    }

    const response = await signIn(data);
    if (response) {
      Router.push('/books');
    } else {
      setLoginError(true);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Loader isLoading={isLoading} />

      <div className={styles.container}>

        <div className={styles.content}>
          <span><img src="/images/logo.png" alt="logo" />Books</span>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_block}>
              <label htmlFor="email">Email</label>
              <input name="email" type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} onInput={() => { loginError ? setLoginError(false) : null }} />
            </div>
            <div className={styles.form_block}>
              <div className={styles.password_block}>
                <div className={styles.pass_block_1}>
                  <label htmlFor="password">Email</label>
                  <input name="password" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} onInput={() => { loginError ? setLoginError(false) : null }} />
                </div>
                <div className={styles.pass_block_2}>
                  <button type="submit">Entrar</button>
                </div>

              </div>


            </div>

          </form>

          <div className={`${styles.tooltip} ` + (!loginError && `${styles.hidden}`)}>
            <div className={styles.arrow_up}></div>
            <div className={styles.tooltip_text}>
              Email e/ou senha incorreta.
            </div>
          </div>


        </div>
      </div>
    </>

  )
}
