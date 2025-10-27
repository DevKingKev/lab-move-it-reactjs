import { Outlet } from "react-router-dom"
import styles from "./Layout.module.scss"

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <div className={styles["layout__header-content"]}>
          <h1 className={styles.layout__title}>
            <div className={styles.layout__header__text}>
              <span className={styles.layout__logo}>
                <img src="/img/logo_with_text.svg" alt="Move It Logo" />
              </span>
            </div>
          </h1>
        </div>
      </header>

      <main className={styles.layout__main}>
        <Outlet />
      </main>

      <footer className={styles.layout__footer}>
        <div className={styles["layout__footer-content"]}></div>
      </footer>
    </div>
  )
}

export default Layout
