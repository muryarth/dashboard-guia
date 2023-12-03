const baseURL = "https://dashboard-guia.vercel.app";

export default class RequestHTTP {
  static GetPaginatedItems = async (endpoint, url = baseURL) => {
    // console.log(`${url}${endpoint}`);

    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      // Verifica se está na rota principal
      try {
        const response = await fetch(`${url}${endpoint}`, {
          method: "GET",
        });

        const jsonData = await response.json();

        if (jsonData.results) {
          return jsonData.results;
        }
      } catch (error) {
        return error;
      }
    } else {
      throw new Error(`Erro na requisição: rota inválida`);
    }
  };

  static GetItemById = async (endpoint, id, url = baseURL) => {
    console.log(`${url}${endpoint}/${id}`);

    try {
      const response = await fetch(`${url}${endpoint}/${id}`, {
        method: "GET",
      });

      const jsonData = await response.json();

      if (jsonData.results) {
        return jsonData.results;
      }
      return [];
    } catch (error) {
      return error;
    }
  };

  // search?nome=Id
  static GetItemsBySearchId = async (endpoint, searchId, url = baseURL) => {
    console.log(`${url}${endpoint}/search?_id=${searchId}`);

    try {
      const response = await fetch(`${url}${endpoint}/search?_id=${searchId}`, {
        method: "GET",
      });

      const jsonData = await response.json();

      if (jsonData.results) {
        return jsonData.results;
      }
      return [];
    } catch (error) {
      return error;
    }
  };
}
