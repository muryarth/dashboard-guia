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

  // search?
  static GetItemsBySearch = async (endpoint, querySearch, url = baseURL) => {
    console.log(`${url}${endpoint}/search?${querySearch}`);

    try {
      const response = await fetch(`${url}${endpoint}/search?${querySearch}`, {
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

  static AddItem = async (endpoint, url = baseURL) => {
    console.log(`${url}${endpoint}`);

    try {
      const response = await fetch(`${url}${endpoint}`, {
        method: "POST",
      });

      return response;
    } catch (error) {
      return error;
    }
  };

  static GetItemById = async (endpoint, id, url = baseURL) => {
    console.log(`${url}${endpoint}/${id}`);

    try {
      const response = await fetch(`${url}${endpoint}/${id}`, {
        method: "DELETE",
      });

      return response;
    } catch (error) {
      return error;
    }
  };
}
