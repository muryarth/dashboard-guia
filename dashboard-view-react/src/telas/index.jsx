import React, { Children } from "react";
import ReactDOM from "react-dom";

// react-bootstrap
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// Componentes da prórpria App
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";

export default function Main({ children }) {
  return (
    <>
      <AppHeader />
      <Sidebar />
      <Container>{children}</Container>
    </>
  );
}
