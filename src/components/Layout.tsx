import { Outlet } from "react-router-dom"
import styles from "./Layout.module.scss"

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <div className={styles["layout__header-content"]}>
          <h1 className={styles.layout__title}>
            Move <span className={styles.layout__logo}></span>It
          </h1>
        </div>
      </header>

      <main className={styles.layout__main}>
        <Outlet />
      </main>

      <footer className={styles.layout__footer}>
        <div className={styles["layout__footer-content"]}>
          <p>&copy; {new Date().getFullYear()} Move-It. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
