import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getProductsPrivate: async (cat = 0, page = 1) => {
    let { data: json } = await api.post(`/private/products?page=${page}`, {
      cat,
    });
    return json;
  },

  addProduct: async (
    title,
    tituloPagina,
    tituloCom,
    descricaoPagina,
    descricaoCom,
    description,
    category,
    banner,
    capa,
    fotoField,
    token
  ) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let body = new FormData();
    body.append("título", title);
    body.append("título_da_página", tituloPagina);
    body.append("título_compartilhamento", tituloCom);
    body.append("descrição_da_página", descricaoPagina);
    body.append("descrição_compartilhamento", descricaoCom);
    body.append("descrição", description);
    body.append("categoria", category);

    if (banner) {
      body.append("banner", banner);
    }

    if (capa) {
      body.append("capa", capa);
    }

    if (fotoField.current.files.length > 0) {
      for (let i = 0; i < fotoField.current.files.length; i++) {
        body.append("imagens[]", fotoField.current.files[i]);
      }
    }

    let { data: json } = await api.post(`/product`, body);
    return json;
  },

  deleteProduct: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.delete(`/product/${id}`);
    return json;
  },

  updateBannerProduct: async (banner, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (banner) {
      body.append("banner", banner);
    }
    let { data: json } = await api.post(`/product/banner/${id}`, body);
    return json;
  },

  updateCapaProduct: async (capa, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (capa) {
      body.append("capa", capa);
    }
    let { data: json } = await api.post(`/product/capa/${id}`, body);
    return json;
  },

  deleteImage: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.delete(`/product/imagem/${id}`);
    return json;
  },

  updateImage: async (fotoField, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let body = new FormData();

    if (fotoField.current.files.length > 0) {
      for (let i = 0; i < fotoField.current.files.length; i++) {
        body.append("imagens[]", fotoField.current.files[i]);
      }
    }

    let { data: json } = await api.post(`/product/images/${id}`, body);
    return json;
  },
  getSingleProduct: async (id) => {
    let { data: json } = await api.get(`/product/private/${id}`);
    return json;
  },

  updateProduct: async (
    titulo,
    tituloPagina,
    tituloCom,
    descricaoPagina,
    descricaoCom,
    description,
    category,
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

    let { data: json } = await api.post(`/product/edit/${id}`, body);

    return json;
  },
};
