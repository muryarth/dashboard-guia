import React, { Component } from "react";
import { Navbar, Nav, Form } from "react-bootstrap";

export default class HeaderNavbar extends Component {
  render() {
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
          <Nav className="me-auto my-2 my-lg-0">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              onChange={(event) => console.log(event.target.value)}
              type="search"
              placeholder="Buscar..."
              className="me-2"
            />
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
