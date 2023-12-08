import Form from "react-bootstrap/Form";

export default function DefaultAppFormField({
  label,
  placeholder,
  state,
  setState,
  required = false,
  as = "input",
}) {
  return (
    <>
      <Form.Group controlId={state} className="mb-4">
        <Form.Label>{`${label}:`}</Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={state}
          onChange={(event) => setState(event.target.value)}
          required={required}
          as={as} // Muda o tipo do input
          rows={as === "textarea" ? 6 : null} // Se for do tipo "textarea" define uma quantidade de linhas
        />
      </Form.Group>
    </>
  );
}
