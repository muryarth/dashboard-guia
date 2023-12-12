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
}) {
  return (
    <>
      <Form.Group className={mb}>
        <Form.Label>{`${label}:`}</Form.Label>
        <Form.Control
          type="text"
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
