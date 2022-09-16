import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  addPost: async (
    titulo,
    tituloPagina,
    tituloCom,
    descricaoPagina,
    descricaoCom,
    description,
    category,
    banner,
    day,
    token
  ) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);
    body.append("título_da_página", tituloPagina);
    body.append("título_compartilhamento", tituloCom);
    body.append("descrição_da_página", descricaoPagina);
    body.append("descrição_compartilhamento", descricaoCom);
    body.append("descrição", description);
    body.append("categoria", category);
    body.append("dia", day);

    if (banner) {
      body.append("imagem", banner);
    }

    let { data: json } = await api.post(`/post`, body);
    return json;
  },

  deletePost: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.delete(`/post/${id}`);
    return json;
  },

  getPostsPrivate: async (cat = 0, page = 1) => {
    let { data: json } = await api.post(`/private/posts?page=${page}`, {
      cat,
    });
    return json;
  },

  updatePost: async (
    titulo,
    tituloPagina,
    tituloCom,
    descricaoPagina,
    descricaoCom,
    description,
    category,
    day,
    id,
    token
  ) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);
    body.append("título_da_página", tituloPagina);
    body.append("título_compartilhamento", tituloCom);
    body.append("descrição_da_página", descricaoPagina);
    body.append("descrição_compartilhamento", descricaoCom);
    body.append("descrição", description);
    body.append("categoria", category);
    body.append("dia", day);

    let { data: json } = await api.post(`/post/edit/${id}`, body);

    return json;
  },

  updateBanner: async (banner, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (banner) {
      body.append("banner", banner);
    }
    let { data: json } = await api.post(`/post/banner/${id}`, body);
    return json;
  },

  getSinglePost: async (id) => {
    let { data: json } = await api.get(`/post/private/${id}`);
    return json;
  },

  addText: async (file) => {
    let body = new FormData();
    body.append("file", file);

    let { data: json } = await api.post(`/postimage`, body);
    return json;
  },
};
