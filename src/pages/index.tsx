
import styles from '../styles/SignIn.module.scss';

export default function SignIn() {
  

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* <span><Image src="/images/logo.png" alt="logo" width={104} height={36} />Books</span> */}
        <span><img src="/images/logo.png" alt="logo" />Books</span>
        <form>
          <div className={styles.form_block}>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" id="email" />
          </div>
          <div className={styles.form_block}>
            <div className={styles.password_block}>
              <div className={styles.pass_block_1}>
                <label htmlFor="password">Email</label>
                <input name="password" type="password" id="password" />
              </div>
              <div className={styles.pass_block_2}>
                <button type="submit">Entrar</button>
              </div>

            </div>

          </div>
        </form>

        <div className={styles.tooltip}>
          <div className={styles.arrow_up}></div>
          <div className={styles.tooltip_text}>
            Email e/ou senha incorreta.
          </div>
        </div>

      </div>
    </div>
  )
}
