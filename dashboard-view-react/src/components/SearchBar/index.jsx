import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import RequestHTTP from "../../services/services";

export default function SearchBar({
  route,
  setSearchResults,
  queryParam = "nome",
  page = 1,
  limit = 1000,
}) {
  const [search, setSearch] = useState();

  const GetDefaultUnsearchedElements = async () => {
    let data = await RequestHTTP.GetPaginatedItems(route, limit, page);

    // Gambiarra pra filtrar dados nulos em /authorizations
    // Corrigir isso depois
    if (route === "/authorizations")
      data = data.filter((a) => a.cliente !== null);

    setSearchResults(data);
  };

  const GetSearchElementsByRoute = async (route, search, setSearchResults) => {
    if (search !== "") {
      console.log(`${route}/search?${queryParam}=${search}`);

      const searchResponse = await RequestHTTP.GetItemsBySearch(
        route,
        `${queryParam}=${search}`
      );

      console.log(setSearchResults);

      setSearchResults(searchResponse);
    } else {
      GetDefaultUnsearchedElements();
    }
  };

  return (
    <Form.Control
      type="text"
      placeholder="Pesquisar..."
      defaultValue={search}
      className="mr-sm-2"
      onChange={(event) => {
        setSearch(event.target.value);
        GetSearchElementsByRoute(route, event.target.value, setSearchResults);
      }}
    />
  );
}
