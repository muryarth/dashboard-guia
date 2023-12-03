import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function HeaderNavbar({ items = [] }) {
  return (
    <Navbar
      className="p-2"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
    >
      <Navbar.Brand href="/">Node.js</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        {items.length > 0 && (
          <Nav className="me-auto my-2 my-lg-0">
            {items.map((item) => {
              // Cria o header de acordo com os valores recebidos pela prop, dinâmicamente
              return (
                <Nav.Link className="active" key={item.name} href={item.link}>
                  {item.name}
                </Nav.Link>
              );
            })}
          </Nav>
        )}
        {/* 
        <Form className="d-flex">
          <Form.Control
            onChange={(event) => console.log(event.target.value)}
            type="search"
            placeholder="Buscar..."
            className="me-2"
          />
        </Form>
        */}
      </Navbar.Collapse>
    </Navbar>
  );
}
