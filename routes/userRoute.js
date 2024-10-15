const userControllers = require("../controllers/user");

const usersRoute = [
  {
    method: "POST",
    path: "/api/user/register",
    handler: userControllers.registerHandler,
    options:{
      
    }
  },
  // {
  //   method: "POST",
  //   path: "/user/login",
  //   handler: (request, h) => {},
  // },
];
module.exports = usersRoute;
