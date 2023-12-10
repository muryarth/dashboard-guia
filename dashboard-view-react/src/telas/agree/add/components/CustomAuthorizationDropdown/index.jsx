import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

// Dropdown que cria um array de itens escolhidos
export default function CustomAuthorizationDropdown({
  title = "Title",
  list,
  state,
  setState,
}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{ maxHeight: "200px", overflowY: "auto" }}
        className="w-50"
      >
        <Dropdown.Item key={"0"} onClick={() => setState([])}>
          {"Nenhum"}
        </Dropdown.Item>
        {list.length > 0 &&
          list.map((listItem) => {
            return (
              <Dropdown.Item
                key={listItem._id}
                onClick={() => {
                  let array = state;
                  if (
                    array.find(
                      (arrayItem) => arrayItem._id === listItem._id
                    ) === undefined // Verifica já há algum item com o id do item escolhido, para evitar repetição
                  ) {
                    const objeto = {
                      _id: listItem._id,
                      nome: listItem.nome || listItem.especialidade,
                    };
                    setState([...state, objeto]);
                  }
                }}
              >
                {listItem.nome || listItem.especialidade}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
