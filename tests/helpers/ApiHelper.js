class ApiHelper {
    constructor(request) {
      this.request = request;
      this.token = "";
    }
  
    async login(user) {
      const response = await this.request.post("/api/auth/login", {
        data: user,
      });
  
      const body = await response.json();
  
      this.token = body.token;
  
      return response;
    }
  
    async getUsers() {
      return await this.request.get("/api/users", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
  
    async getProfile() {
      return await this.request.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
  }
  
  module.exports = ApiHelper;