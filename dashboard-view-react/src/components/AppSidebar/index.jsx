import React from "react";

// Estilos
import "./sidebar.css";

export default function Sidebar() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              <i className="bi bi-house"></i>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              <i className="bi bi-patch-question"></i>
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
