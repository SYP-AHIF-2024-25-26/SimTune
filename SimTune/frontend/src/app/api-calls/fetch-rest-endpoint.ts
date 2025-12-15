import { environment } from "../../environments/environment";

export { fetchRestEndpoint, API_URL, fetchRestEndpointWithAuthorization };
  const API_URL = environment.apiUrl;

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

  async function fetchRestEndpointWithAuthorization
    (route: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", data?: object):
    Promise<any> {
    const options: RequestInit = { method };

    const jwt = sessionStorage.getItem("jwt");

    if (jwt) {
      if (!options.headers) {
        options.headers = {};
      }
      (options.headers as Record<string, string>)["Authorization"] = `Bearer ${jwt}`;
    }

    if (data) {
      if (!options.headers) {
        options.headers = {};
      }
      (options.headers as Record<string, string>)["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }

    const res = await fetch(route, options);

    if (!res.ok) {
      if (res.status === 401) {
        sessionStorage.removeItem("jwt");
        alert("Session abgelaufen. Bitte erneut einloggen.");
        window.location.href = "/login";
        return;
      }

      const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
      throw error;
    }

    if (res.status !== 204) {
      return await res.json();
    }
  }
