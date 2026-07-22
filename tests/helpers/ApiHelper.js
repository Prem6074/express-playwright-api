class ApiHelper {
  constructor(request) {
    this.request = request;
  }

  // =========================
  // AUTH APIs
  // =========================

  async register(user) {
    return await this.request.post("/api/auth/register", {
      data: user,
    });
  }

  async login(user) {
    return await this.request.post("/api/auth/login", {
      data: user,
    });
  }

  // =========================
  // USER APIs
  // =========================

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

  // =========================
  // PRODUCT APIs
  // =========================

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

  // =========================
  // CART APIs
  // =========================

  async addToCart(cartData, token) {
    return await this.request.post("/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: cartData,
    });
  }

  async getCart(token) {
    return await this.request.get("/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateCart(cartId, quantity, token) {
    return await this.request.put(`/api/cart/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        quantity,
      },
    });
  }

  async removeFromCart(cartId, token) {
    return await this.request.delete(`/api/cart/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async clearCart(token) {
    return await this.request.delete("/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // =========================
  // ORDER APIs
  // =========================

  async placeOrder(token) {
    return await this.request.post("/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getOrders(token) {
    return await this.request.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getOrderById(orderId, token) {
    return await this.request.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateOrderStatus(orderId, status, token) {
    return await this.request.put(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        status,
      },
    });
  }

  async deleteOrder(orderId, token) {
    return await this.request.delete(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

module.exports = ApiHelper;