import { Table, Button } from "react-bootstrap";

export default function Dashboard({
  elements = [
    { nome: "nome", cpf: "cpf", email: "email", telefone: "telefone" },
    { nome: "nome", cpf: "cpf", email: "email", telefone: "telefone" },
    { nome: "nome", cpf: "cpf", email: "email", telefone: "telefone" },
  ],
  fields = ["nome", "cpf", "email", "telefone"],
  buttonsGroup = [],
  message = "Nenhum item disponível.",
}) {
  return (
    <>
      {fields.length > 0 && elements.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            {/* Cabeçalhos */}
            <thead>
              <tr>
                {fields.map((field) => {
                  if (
                    field === "cpf" ||
                    field === "rg" ||
                    field === "uf" ||
                    field === "cep"
                  ) {
                    return (
                      <th key={field} className="text-center">
                        {`${field.toUpperCase()}`}
                      </th>
                    );
                  } else if (field === "registerDate") {
                    return (
                      <th key={field} className="text-center">
                        {"Cadastrado em:"}
                      </th>
                    );
                  } else if (field === "lastUpdated") {
                    return (
                      <th key={field} className="text-center">
                        {"Última atualização:"}
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

            {/* Renderiza cada célula da tabela */}
            <tbody>
              {elements.map((element) => (
                <tr key={element._id}>
                  {fields.map((field) => {
                    if (field === "nome" && element.sobrenome) {
                      return (
                        <td
                          key={field}
                          className="text-center"
                        >{`${element["nome"]} ${element["sobrenome"]}`}</td>
                      );
                    } else if (field === "registerDate") {
                      return (
                        <td
                          key={field}
                          className="text-center"
                        >{`${element[field].FormatBR}`}</td>
                      );
                    } else if (field === "lastUpdated") {
                      return (
                        <td
                          key={field}
                          className="text-center"
                        >{`${element[field].FormatBR}`}</td>
                      );
                    } else if (field === "administrador") {
                      return (
                        <td key={field} className="text-center">
                          {element[field] === true ? "Sim" : "Não"}
                        </td>
                      );
                    }
                    return (
                      <td key={field} className="text-center">
                        {element[field]}
                      </td>
                    );
                  })}

                  {/* Renderiza o componente com botões (Opcional) */}
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
        <p className="text-center">{message}</p>
      )}
    </>
  );
}
