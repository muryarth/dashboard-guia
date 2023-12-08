import React from "react";
import Button from "react-bootstrap/Button";

export default function DefaultAppButton({
  title = "Button",
  variant = "success",
  action = console.log("Click!"),
}) {
  return (
    <Button
      variant={variant}
      size="sm"
      className="me-2"
      onClick={() => action()}
    >
      {title}
    </Button>
  );
}
