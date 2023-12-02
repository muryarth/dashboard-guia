import React, { Children } from "react";
import ReactDOM from "react-dom";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

// Componentes da prórpria App
import NewSidebar from "../components/AppSidebar";
import AppHeader from "../components/AppHeader";

export default function Main({ children }) {
  const sidebarStyle = {
    background: "#efefef",
    height: "100vh",
    position: "fixed",
    left: 0,
    width: "calc(5% + max(300px, 5%))",
  };

  const contentStyle = {
    // background: "lightgreen",
    height: "100vh",
    position: "fixed",
    right: 0,
    width: "calc(95% - max(300px, 5%))",
  };

  const scrollableContent = {
    overflow: "auto",
    height: "100%", // ou uma altura específica
    padding: "35px", // ajuste conforme necessário
  };

  const sidebarOptions = [{}];

  return (
    <>
      {/* Header fixo da App */}
      <AppHeader />

      <Row style={{ margin: 0, overflow: "hidden" }}>
        {/* Siderbar fixa da App */}
        <Col style={{ padding: 0, ...sidebarStyle }}>
          <NewSidebar />
        </Col>

        {/* Conteúdo principal da página */}
        <Col style={{ padding: 0, ...contentStyle }}>
          <Container fluid style={scrollableContent}>
            {children}
          </Container>
        </Col>
      </Row>
    </>
  );
}
