const getUsers = (req, res) => {
    res.status(200).json([
      {
        id: 1,
        name: "Prem",
        role: "QA"
      },
      {
        id: 2,
        name: "John",
        role: "Developer"
      }
    ]);
  };
  
  const getProfile = (req, res) => {
    res.status(200).json({
      id: 1,
      name: "Prem",
      email: "admin@test.com",
      role: "QA Engineer"
    });
  };
  
  module.exports = {
    getUsers,
    getProfile
  };