const fs = require("fs");
const dotenv = require("dotenv");
const config = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`));
export { config };
