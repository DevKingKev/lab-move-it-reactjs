import { Outlet } from "react-router-dom"
import "./Layout.module.scss"

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__header-content">
          <h1 className="layout__title">Move-It</h1>
        </div>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <footer className="layout__footer">
        <div className="layout__footer-content">
          <p>&copy; {new Date().getFullYear()} Move-It. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
