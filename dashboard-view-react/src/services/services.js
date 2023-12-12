export default class RequestHTTP {
  static BaseURL =
    process.env.REACT_APP_BASE_URL || "https://dashboard-guia.vercel.app";

  static GetPaginatedItems = async (
    endpoint,
    limit = 10,
    page = 1,
    url = this.BaseURL
  ) => {
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      // Verifica se está na rota principal
      try {
        const response = await fetch(
          `${url}${endpoint}?limit=${limit}&page=${page}`,
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

  static GetItemById = async (endpoint, _id, url = this.BaseURL) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      try {
        const response = await fetch(`${url}${endpoint}/${_id}`, {
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

  static ValidateUser = async (
    user = { login: null, senha: null },
    url = this.BaseURL
  ) => {
    try {
      const response = await fetch(
        `${url}/employees/auth?login=${user.login}&senha=${user.senha}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return await response.json();
    } catch (error) {
      return error;
    }
  };

  static AddItem = async (endpoint, body, url = this.BaseURL) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      try {
        const response = await fetch(`${url}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

  static UpdateItem = async (endpoint, _id, body, url = this.BaseURL) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      try {
        const response = await fetch(`${url}${endpoint}/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
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

  static DeleteItemById = async (endpoint, _id, url = this.BaseURL) => {
    // Verifica se está na rota principal
    if (!(endpoint.split("/").filter((part) => part !== "").length > 1)) {
      try {
        const response = await fetch(`${url}${endpoint}/${_id}`, {
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
