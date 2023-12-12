import React, { useState } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";

export default function DefaultAppFormField({
  label,
  state,
  setState,
  placeholder = "",
  required = false,
  disabled = false,
  as = "input",
  mb = "mb-4",
  type = "text",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Form.Group className={mb}>
        <Form.Label>{`${label}:`}</Form.Label>
        <span
          className={`ms-2 ml-2 text-primary ${
            type === "password" ? "d-show" : "d-none"
          }`}
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: "pointer", fontSize: "0.9em" }}
        >
          {showPassword ? "(Esconder)" : "(Mostrar)"}
        </span>
        <Form.Control
          type={type === "password" ? showPassword ? "text" : "password" : "text"}
          placeholder={placeholder}
          defaultValue={state} // Use defaultValue instead of value
          onChange={(event) => setState(event.target.value)}
          as={as}
          rows={as === "textarea" ? 6 : null}
          disabled={disabled}
          required={required}
        />
      </Form.Group>
    </>
  );
}
