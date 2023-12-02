import React, { useState } from "react";
import { Nav, Container } from "react-bootstrap";

export default function NewSidebar({
  items = [
    { name: "Dashboard", link: "/customers" },
    { name: "About", link: "/customers/about" },
  ],
}) {
  // const [sidebarItems, setSidebarItems] = useState();

  return (
    <Nav className="flex-column position-fixed pt-3">
      <Container fluid>
        {items.map((item) => {
          // Cria a sidebar de acordo com os valores recebidos pela prop, dinâmicamente
          return (
            <Nav.Link
              className="active"
              // key={item.name.toLowerCase()}
              key={item.name}
              href={item.link}
            >
              {item.name}
            </Nav.Link>
          );
        })}
      </Container>
    </Nav>
  );
}
