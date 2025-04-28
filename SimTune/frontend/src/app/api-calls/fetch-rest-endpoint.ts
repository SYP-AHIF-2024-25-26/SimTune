export { fetchRestEndpoint, API_URL };
  // für lokale Entwicklung
  const API_URL = "http://localhost:5069/";

  // für docker
  //const API_URL = "http://localhost:8081/";

  // für azure
  //const API_URL = "https://simtune-backend.salmonmeadow-e01ebf27.germanywestcentral.azurecontainerapps.io/";

  // für leocloud
  //const API_URL = "https://if210019.cloud.htl-leonding.ac.at/api/";


  async function fetchRestEndpoint
      (route: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", data?: object):
      Promise<any> {
      const options: RequestInit = { method };
      if (data) {
          options.headers = { "Content-Type": "application/json" };
          options.body = JSON.stringify(data);
      }
      const res = await fetch(route, options);
      if (!res.ok) {
          const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
          throw error;
      }
      if (res.status !== 204) {
          return await res.json();
      }
  }
