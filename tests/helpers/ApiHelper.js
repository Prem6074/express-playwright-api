class ApiHelper {
    constructor(request) {
      this.request = request;
    }
  
    async login(user) {
      return await this.request.post("/api/auth/login", {
        data: user,
      });
    }
  
    async getUsers() {
      return await this.request.get("/api/users");
    }
  
    async getProfile() {
      return await this.request.get("/api/users/profile");
    }
  }
  
  module.exports = ApiHelper;