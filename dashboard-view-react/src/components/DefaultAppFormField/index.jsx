import Form from "react-bootstrap/Form";

export default function DefaultAppFormField({
  label,
  placeholder,
  state,
  setState,
  required = false,
  disabled = false,
  as = "input",
}) {
  return (
    <>
      <Form.Group className="mb-4">
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
