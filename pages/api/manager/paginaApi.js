import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getPagina: async (controladora) => {
    let { data: json } = await api.get(`/pagina/${controladora}`);
    return json;
  },

  updatePagina: async (
    titulo,
    descricao,
    tituloCom,
    descricaoCom,
    id,
    token
  ) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);
    body.append("descrição", descricao);
    body.append("título_compartilhamento", tituloCom);
    body.append("descrição_compartilhamento", descricaoCom);

    let { data: json } = await api.post(`/pagina/${id}`, body);

    return json;
  },

  updatePaginaImagem: async (imagem, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (imagem) {
      body.append("imagem", imagem);
    } else {
      return;
    }
    let { data: json } = await api.post(`/pagina/imagem/${id}`, body);
    return json;
  },
};
