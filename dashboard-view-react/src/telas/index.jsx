import React from "react";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Componentes da prórpria App
import AppSidebar from "../components/AppSidebar";
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

  const headerOptions = [];

  const sidebarOptions = [
    { name: "Clientes", link: "/customers" },
    { name: "Funcionários", link: "/employees" },
    { name: "Convênios", link: "/agreements" },
    { name: "Histórico de guias", link: "/authorizations" },
    { name: "About", link: "/about" },
  ];

  return (
    <>
      {/* Header fixo da App */}
      <AppHeader items={headerOptions} />

      <Row style={{ margin: 0, overflow: "hidden" }}>
        {/* Siderbar fixa da App */}
        <Col style={{ padding: 0, ...sidebarStyle }}>
          <AppSidebar items={sidebarOptions} />
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
