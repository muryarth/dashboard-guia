export default class RequestHTTP {
  static GetPaginatedItems = async (
    endpoint,
    url = "https://dashboard-server-api.vercel.app"
  ) => {
    // console.log(`${url}${endpoint}`);

    try {
      const response = await fetch(`${url}${endpoint}`, {
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
