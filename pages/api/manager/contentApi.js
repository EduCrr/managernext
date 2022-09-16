import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getCotentHome: async (controladora) => {
    let { data: json } = await api.get(`/content/${controladora}`);
    return json;
  },

  updateContent: async (titulo, description, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);
    body.append("descrição", description);

    let { data: json } = await api.post(`/content/home/${id}`, body);

    return json;
  },

  updateContentImagem: async (imagem, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (imagem) {
      body.append("imagem", imagem);
    } else {
      return;
    }
    let { data: json } = await api.post(`/content/imagem/${id}`, body);
    return json;
  },

  updateContentImagemResponsive: async (imagem, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (imagem) {
      body.append("imagem", imagem);
    } else {
      return;
    }
    let { data: json } = await api.post(
      `/content/imagem/responsive/${id}`,
      body
    );
    return json;
  },
};
