class ApiHelper {
    constructor(request) {
      this.request = request;
    }
  
    async login(user) {
      return await this.request.post("/api/auth/login", {
        data: user,
      });
    }
  
    async getUsers(token) {
      return await this.request.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
    async getProfile(token) {
      return await this.request.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
    async getUserById(id, token) {
      return await this.request.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    async updateUser(id, data, token) {
        return await this.request.put(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data,
        });
      }
      async deleteUser(id, token) {
        return await this.request.delete(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      async createProduct(product, token) {
        return await this.request.post("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: product,
        });
      }
      async getProducts(token) {
        return await this.request.get("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      async getProductById(id, token) {
        return await this.request.get(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      async updateProduct(id, data, token) {
        return await this.request.put(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data,
        });
      }
      async deleteProduct(id, token) {
        return await this.request.delete(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      async getProductsWithQuery(query, token) {
        return await this.request.get(`/api/products?${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
  }
  
  module.exports = ApiHelper;