import { Table } from "react-bootstrap";

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
                      <th
                        style={{ minWidth: 100 }}
                        key={field}
                        className="text-center align-middle"
                      >
                        {`${field.toUpperCase()}`}
                      </th>
                    );
                  } else if (field === "registerDate") {
                    return (
                      <th key={field} className="text-center align-middle">
                        {"Cadastrado em:"}
                      </th>
                    );
                  } else if (field === "lastUpdated") {
                    return (
                      <th key={field} className="text-center align-middle">
                        {"Última atualização:"}
                      </th>
                    );
                  } else {
                    return (
                      <th key={field} className="text-center align-middle">
                        {`${field.charAt(0).toUpperCase()}${field.slice(1)}`}
                      </th>
                    );
                  }
                })}
                {buttonsGroup.length > 0 &&
                  buttonsGroup.map((buttonGroup) => {
                    if (buttonGroup.title && buttonGroup.component) {
                      return (
                        <th
                          key={buttonGroup.title}
                          className="text-center align-middle"
                        >
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
                    if (
                      // Se o campo for vazio, null ou undefined renderiza um "-"
                      element[field] === null ||
                      element[field] === undefined ||
                      element[field] === ""
                    ) {
                      return (
                        <td key={field} className="text-center align-middle">
                          -
                        </td>
                      );
                    } else if (field === "nome" && element.sobrenome) {
                      // Se tiver nome e sobrenome
                      return (
                        <td
                          key={field}
                          style={{ minWidth: 140, maxWidth: 200 }}
                          className="text-center align-middle"
                        >{`${element["nome"]} ${element["sobrenome"]}`}</td>
                      );
                    } else if (field === "cliente") {
                      // Em alguns casos, "nome" é tratado como "cliente"
                      return (
                        <td
                          key={field}
                          style={{ minWidth: 140, maxWidth: 200 }}
                          className="text-center align-middle"
                        >
                          {`${element[field].nome} ${element[field].sobrenome}`}
                        </td>
                      );
                    } else if (
                      // Se for data, renderiza o formato brasileiro
                      field === "registerDate" ||
                      field === "lastUpdated"
                    ) {
                      return (
                        <td
                          key={field}
                          className="text-center align-middle"
                        >{`${element[field].FormatBR}`}</td>
                      );
                    } else if (field === "administrador") {
                      // Trata a visualização de uma variável booleana
                      return (
                        <td key={field} className="text-center align-middle">
                          {element[field] === true ? "Sim" : "Não"}
                        </td>
                      );
                    } else if (field === "local") {
                      // Mostra o nome da clínica
                      return (
                        <td key={field} className="text-center align-middle">
                          {element[field].nome}
                        </td>
                      );
                    } else if (field === "especialidade") {
                      // Mostra o nome da especialidade
                      return (
                        <td key={field} className="text-center align-middle">
                          {element[field].especialidade}
                        </td>
                      );
                    }
                    // Histórico de guias
                    else if (field === "locais") {
                      let htmlElement = (
                        <td key={field} className="text-center align-middle">
                          {element[field].map((item) => {
                            return `${item.nome}; `;
                          })}
                        </td>
                      );

                      return htmlElement;
                    } else if (field === "especialidades") {
                      let htmlElement = (
                        <td key={field} className="text-center align-middle">
                          {element[field].map((item) => {
                            return `${item.especialidade}; `;
                          })}
                        </td>
                      );
                      return htmlElement;
                    }

                    // Trata um campo qualquer
                    return (
                      <td
                        key={field}
                        style={{ minWidth: 120 }}
                        className="text-center align-middle"
                      >
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
                            className="text-center align-middle"
                            style={{ maxWidth: 200 }}
                          >
                            <buttonGroup.component // Se quiser mostrar o sobrenome
                              _id={element._id}
                              name={
                                element.sobrenome
                                  ? `${element.nome} ${element.sobrenome}`
                                  : element.nome || element.especialidade
                              }
                            />
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
        <p className="text-center align-middle">{message}</p>
      )}
    </>
  );
}
