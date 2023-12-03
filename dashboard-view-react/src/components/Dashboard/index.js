import { Table, Button } from "react-bootstrap";

export default function Dashboard(
  elements,
  fields = ["nome", "cpf", "email", "telefone"],
  buttonsGroup = [
    {
      title: "Ações",
      component: (
        <>
          <Button
            variant="info"
            size="sm"
            className="me-2"
            onClick={() => console.log("Teste")}
          >
            Visualizar
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="me-2"
            onClick={() => console.log("Teste")}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => console.log("Teste")}
          >
            Deletar
          </Button>
        </>
      ),
    },
  ]
) {
  return (
    <>
      {elements.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {fields.map((field) => {
                  if (
                    (field !== "cpf",
                    field !== "rg",
                    field !== "uf",
                    field !== "cep")
                  ) {
                    return (
                      <th key={field} className="text-center">
                        {`${field.charAt(0).toUpperCase()}${field.slice(1)}`}
                      </th>
                    );
                  } else {
                    return (
                      <th key={field} className="text-center">
                        {`${field.charAt(0).toUpperCase()}${field.slice(1)}`}
                      </th>
                    );
                  }
                })}
                {buttonsGroup.length > 0 &&
                  buttonsGroup.map((buttonGroup) => {
                    if (buttonGroup.title && buttonGroup.component) {
                      return (
                        <th key={buttonGroup.title} className="text-center">
                          {buttonGroup.title}
                        </th>
                      );
                    }
                  })}
              </tr>
            </thead>
            <tbody>
              {elements.map((element) => (
                <tr key={element._id}>
                  {/* Renderiza cada célula da tabela */}
                  {fields.map((field) => {
                    if (field === "nome" && element.sobrenome) {
                      return (
                        <td
                          key={field}
                          className="text-center"
                        >{`${element["nome"]} ${element["sobrenome"]}`}</td>
                      );
                    }
                    return <td className="text-center">{element[field]}</td>;
                  })}

                  {/* Renderiza o componente com botões */}
                  {buttonsGroup.length > 0 &&
                    buttonsGroup.map((buttonGroup) => {
                      if (buttonGroup.title && buttonGroup.component) {
                        return (
                          <td
                            key={`${buttonGroup.title}`}
                            className="text-center"
                          >
                            {buttonGroup.component}
                          </td>
                        );
                      }
                    })}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p className="text-center">No customers available.</p>
      )}
    </>
  );
}
