import React, { Children } from "react";
import ReactDOM from "react-dom";

// react-bootstrap
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// Componentes da prórpria App
import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";

export default function Main({ children }) {
  return (
    <>
      {/* <AppHeader />
      <AppSidebar /> */}
      <Container className="ms-auto">{children}</Container>
    </>
  );
}
