const login = (req, res) => {
    const { email, password } = req.body;
  
    if (email === "admin@test.com" && password === "password123") {
      return res.status(200).json({
        success: true,
        message: "Login Successful",
        token: "sample-jwt-token"
      });
    }
  
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials"
    });
  };
  
  module.exports = {
    login
  };