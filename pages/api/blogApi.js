import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getUser: async () => {
    let { data: json } = await api.get(`/user`);
    return json;
  },

  changeVisivel: async (id, check, link, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    if (link === "posts") {
      let { data: json } = await api.post(`/post/visivel/${id}`, {
        check,
      });
      return json;
    } else if (link === "produtos") {
      let { data: json } = await api.post(`/product/visivel/${id}`, {
        check,
      });
      return json;
    }
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

  getPosts: async (page = 1) => {
    let { data: json } = await api.get(`/private/posts?page=${page}`);
    return json;
  },

  getData: async (page = 1, link) => {
    if (link === "posts") {
      let { data: json } = await api.get(`/private/posts?page=${page}`);
      return json;
    } else if (link === "produtos") {
      let { data: json } = await api.get(`/private/products?page=${page}`);
      return json;
    }
  },

  getSinglePost: async (id) => {
    let { data: json } = await api.get(`/post/private/${id}`);
    return json;
  },

  search: async (q, link) => {
    if (link === "posts") {
      let { data: json } = await api.get(`/search/posts?q=${q}`);
      return json;
    } else if (link === "produtos") {
      let { data: json } = await api.get(`/search/products?q=${q}`);
      return json;
    }
  },

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

  // createUser: async (name, password, email) => {
  //   let { data: json } = await api.post(`/user`, {
  //     name,
  //     password,
  //     email,
  //   });
  //   return json;
  // },

  createCat: async (title, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/categorie`, body);
    return json;
  },

  loginUser: async (password, email) => {
    let { data: json } = await api.post(`/auth/login`, {
      password,
      email,
    });
    return json;
  },

  // updateUserName: async (name) => {
  //   let { data: json } = await api.post(`/user`, {
  //     name,
  //   });
  //   return json;
  // },
  // updateUserEmail: async (email) => {
  //   let { data: json } = await api.post(`/user`, {
  //     email,
  //   });
  //   return json;
  // },

  // updateUserPassword: async (password, password_confirm) => {
  //   let { data: json } = await api.post(`/user`, {
  //     password,
  //     password_confirm,
  //   });
  //   return json;
  // },

  // updateAvatar: async (avatar) => {
  //   let body = new FormData();
  //   if (avatar) {
  //     body.append("avatar", avatar);
  //   }
  //   let { data: json } = await api.post(`/user/avatar`, body);
  //   return json;
  // },

  addPost: async (titulo, description, category, banner, day, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);
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

  updatePost: async (titulo, description, category, day, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);
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

  deleteImage: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.delete(`/post/imagem/${id}`);
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

    let { data: json } = await api.post(`/post/images/${id}`, body);
    return json;
  },

  sendEmail: async (email, name, fotoField) => {
    let body = new FormData();
    body.append("email", email);
    body.append("name", name);

    if (fotoField.current.files.length > 0) {
      for (let i = 0; i < fotoField.current.files.length; i++) {
        body.append("att[]", fotoField.current.files[i]);
      }
    }

    let { data: json } = await api.post(`/teste`, body);
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

  addText: async (file) => {
    let body = new FormData();
    body.append("file", file);

    let { data: json } = await api.post(`/postimage`, body);
    return json;
  },

  //CONTENT
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

  //SLIDE

  getSlidesPrivate: async () => {
    let { data: json } = await api.get(`/private/slides`);
    return json;
  },

  deleteSlide: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.delete(`/slide/${id}`);
    return json;
  },

  addSlide: async (titulo, fotoField, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);

    if (fotoField) {
      body.append("imagem", fotoField);
    }

    let { data: json } = await api.post(`/slide`, body);
    return json;
  },

  changeVisivelSlide: async (id, check, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.post(`/slide/visivel/${id}`, {
      check,
    });
    return json;
  },
  getSingleSlide: async (id) => {
    let { data: json } = await api.get(`/slide/private/${id}`);
    return json;
  },

  updateSlide: async (title, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/slide/edit/${id}`, body);

    return json;
  },

  updateSlideImagem: async (imagem, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (imagem) {
      body.append("imagem", imagem);
    }
    let { data: json } = await api.post(`/slide/imagem/${id}`, body);
    return json;
  },

  //products

  getProductsPrivate: async (page = 1) => {
    let { data: json } = await api.get(`/private/products?page=${page}`);
    return json;
  },

  addProduct: async (
    title,
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

  updateProduct: async (titulo, description, category, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);
    body.append("descrição", description);
    body.append("categoria", category);

    let { data: json } = await api.post(`/product/edit/${id}`, body);

    return json;
  },

  //PAGINA
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
