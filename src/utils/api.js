const API_URL = "http://localhost:8080";

// ===================================
// TOKEN SEGURO
// ===================================
function getToken() {
  const t = localStorage.getItem("token");
  return t ? t.replace(/"/g, "") : "";
}

// ===================================
// PARSEAR RESPUESTA
// ===================================
async function parseResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// ===================================
// GET
// ===================================
export async function apiGet(path) {
  console.log("TOKEN ENVIADO →", getToken());

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  return parseResponse(res);
}

// ===================================
// POST
// ===================================
export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse(res);
}

// ===================================
// PUT
// ===================================
export async function apiPut(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse(res);
}

// ===================================
// DELETE
// ===================================
export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  return parseResponse(res);
}
