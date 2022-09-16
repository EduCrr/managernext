import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getCategories: async () => {
    let { data: json } = await api.get(`/categories`);
    return json;
  },
  //posts
  getCategoriesPrivate: async () => {
    let { data: json } = await api.get(`/categories/private`);
    return json;
  },

  getCategoriesVisivelPrivate: async (link) => {
    if (link === "categorias") {
      //posts
      let { data: json } = await api.get(`/categories/private`);
      return json;
    }
    if (link === "categorias-produtos") {
      //produtos
      let { data: json } = await api.get(`/categories/product/private`);
      return json;
    }
  },

  getSingleCategory: async (id, page = 1, link) => {
    if (link === "posts") {
      let { data: json } = await api.get(`/categorie/${id}?page=${page}`);
      return json;
    } else if (link === "produtos") {
      let { data: json } = await api.get(
        `/categorie/product/${id}?page=${page}`
      );
      return json;
    }
  },
  getSingleCategoryEdit: async (id) => {
    let { data: json } = await api.get(`/categorie/edit/${id}`);
    return json;
  },

  getSingleCategoryProductEdit: async (id) => {
    let { data: json } = await api.get(`/categorie/product/edit/${id}`);
    return json;
  },

  createCat: async (title, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/categorie`, body);
    return json;
  },

  deleteCat: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.delete(`/categorie/${id}`);
    return json;
  },

  deleteCatProduct: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.delete(`/categorie/product/${id}`);
    return json;
  },

  changeVisivelCategory: async (id, check, link, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (link === "categorias") {
      let { data: json } = await api.post(`/categorie/visivel/${id}`, {
        check,
      });
      return json;
    } else if (link === "categorias-produtos") {
      let { data: json } = await api.post(`/categorie/product/visivel/${id}`, {
        check,
      });
      return json;
    }
  },

  //categoria produtos

  createCatProducts: async (title, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/create/categorie/product`, body);
    return json;
  },

  updateCat: async (title, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/categorie/${id}`, body);
    return json;
  },

  updateCatProduct: async (title, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/categorie/product/${id}`, body);
    return json;
  },

  getCategoriesProductsPrivate: async () => {
    let { data: json } = await api.get(`/categories/product/private`);
    return json;
  },
};
