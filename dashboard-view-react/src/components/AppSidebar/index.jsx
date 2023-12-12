import React, { useState } from "react";
import { Nav, Container } from "react-bootstrap";

export default function NewSidebar({
  items = [
    { name: "Dashboard", link: "/customers" },
    { name: "About", link: "/customers/about" },
  ],
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseOver = (itemName) => {
    setHoveredItem(itemName);
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };

  return (
    <Nav className="flex-column position-relative pt-3 w-100">
      <Container fluid>
        {items.map((item) => (
          <Nav.Link
            key={item.name}
            href={item.link}
            className={`pt-4 ps-4 ${
              hoveredItem === item.name ? "hovered" : ""
            }`}
            onMouseOver={() => handleMouseOver(item.name)}
            onMouseOut={handleMouseOut}
          >
            {item.name}
          </Nav.Link>
        ))}
      </Container>
    </Nav>
  );
}
