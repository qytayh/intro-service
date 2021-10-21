const serve = require("./src/app");

const server = serve.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
  console.log("api doc at http://localhost:3000/swagger/swagger-html \n");
  console.log("Press CTRL-C to stop \n");
});

module.exports = server;
