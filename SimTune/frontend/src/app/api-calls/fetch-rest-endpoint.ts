export { fetchRestEndpoint, API_URL };

  const API_URL = "http://localhost:8081/";

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
