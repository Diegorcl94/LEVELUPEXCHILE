const API_URL = "http://localhost:8080";

function getToken() {
  const t = localStorage.getItem("token");
  return t ? t.replace(/"/g, "") : "";
}

async function parseResponse(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function apiGet(path) {
  return fetch(`${API_URL}${path}`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  }).then(parseResponse);
}

export async function apiPost(path, body) {
  return fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body),
  }).then(parseResponse);
}

export async function apiPut(path, body) {
  return fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body),
  }).then(parseResponse);
}

export async function apiDelete(path) {
  return fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  }).then(parseResponse);
}
