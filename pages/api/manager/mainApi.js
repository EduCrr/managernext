import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getUser: async () => {
    let { data: json } = await api.get(`/user`);
    return json;
  },

  getTeste: async () => {
    let { data: json } = await api.get(`/teste`);
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

  getData: async (page = 1, link, cat) => {
    if (link === "posts") {
      let { data: json } = await api.post(`/private/posts?page=${page}`, {
        cat,
      });
      return json;
    } else if (link === "produtos") {
      let { data: json } = await api.post(`/private/products?page=${page}`, {
        cat,
      });
      return json;
    }
  },

  getDataOrder: async (link, cat = "0") => {
    if (link === "posts") {
      let { data: json } = await api.get(`/posts/order/${cat}`);
      return json;
    } else if (link === "produtos") {
      let { data: json } = await api.get(`/products/order/${cat}`);
      return json;
    }
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

  // createUser: async (name, password, email) => {
  //   let { data: json } = await api.post(`/user`, {
  //     name,
  //     password,
  //     email,
  //   });
  //   return json;
  // },

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

  // deleteImage: async (id, token) => {
  //   api.defaults.headers.Authorization = `Bearer ${token}`;
  //   let { data: json } = await api.delete(`/post/imagem/${id}`);
  //   return json;
  // },

  // updateImage: async (fotoField, id, token) => {
  //   api.defaults.headers.Authorization = `Bearer ${token}`;
  //   let body = new FormData();
  //   if (fotoField.current.files.length > 0) {
  //     for (let i = 0; i < fotoField.current.files.length; i++) {
  //       body.append("imagens[]", fotoField.current.files[i]);
  //     }
  //   }

  //   let { data: json } = await api.post(`/post/images/${id}`, body);
  //   return json;
  // },

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

  orderItens: async (itens, link, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("itens", itens);

    if (link === "posts") {
      let { data: json } = await api.post(`/order/posts`, body);
      return json;
    } else if (link === "produtos") {
      let { data: json } = await api.post(`/order/products`, body);
      return json;
    } else if (link === "categorias-produtos") {
      let { data: json } = await api.post(`/order/category/products`, body);
      return json;
    } else if (link === "categorias") {
      let { data: json } = await api.post(`/order/category`, body);
      return json;
    } else if (link === "slides") {
      let { data: json } = await api.post(`/order/slide`, body);
      return json;
    }
  },
};
