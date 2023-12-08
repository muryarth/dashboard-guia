export default class RequestHTTP {
  static BaseURL =
    process.env.REACT_APP_BASE_URL || "https://dashboard-guia.vercel.app";

  static GetPaginatedItems = async (
    endpoint,
    limit = 10,
    page = 1,
    url = this.BaseURL
  ) => {
    // console.log(url);

    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      // Verifica se está na rota principal
      try {
        const response = await fetch(
          `${url}${endpoint}?$limit=${limit}&page=${page}`,
          {
            method: "GET",
          }
        );

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

  static GetItemsBySearch = async (
    endpoint,
    querySearch,
    url = this.BaseURL
  ) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      try {
        const response = await fetch(
          `${url}${endpoint}/search?${querySearch}`,
          {
            method: "GET",
          }
        );

        const jsonData = await response.json();

        if (jsonData.results) {
          return jsonData.results;
        }
        return [];
      } catch (error) {
        return error;
      }
    } else {
      throw new Error(`Erro na requisição: rota inválida`);
    }
  };

  static GetItemById = async (endpoint, id, url = this.BaseURL) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
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
    } else {
      throw new Error(`Erro na requisição: rota inválida`);
    }
  };

  static AddItem = async (endpoint, body, url = this.BaseURL) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      try {
        const response = await fetch(`${url}${endpoint}`, {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify(body),
        });

        return response;
      } catch (error) {
        return error;
      }
    } else {
      throw new Error(`Erro na requisição: rota inválida`);
    }
  };

  static UpdateItem = async (endpoint, body, url = this.BaseURL) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      try {
        const response = await fetch(`${url}${endpoint}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });

        return response;
      } catch (error) {
        return error;
      }
    } else {
      throw new Error(`Erro na requisição: rota inválida`);
    }
  };

  static DeleteItemById = async (endpoint, id, url = this.BaseURL) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      try {
        const response = await fetch(`${url}${endpoint}/${id}`, {
          method: "DELETE",
        });

        return response;
      } catch (error) {
        return error;
      }
    } else {
      throw new Error(`Erro na requisição: rota inválida`);
    }
  };
}
