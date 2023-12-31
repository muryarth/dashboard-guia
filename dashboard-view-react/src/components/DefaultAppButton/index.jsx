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
      className="m-1"
      style={{
        fontSize: "0.8rem",
        minWidth: "80px",
        maxWidth: "200px",
        width: "35%",
      }}
      onClick={() => action()}
    >
      {title}
    </Button>
  );
}
