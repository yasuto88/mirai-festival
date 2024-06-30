express = require("express");
next = require("next");
https = require("https");
fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("../certificates/localhost+2-key.pem"),
  cert: fs.readFileSync("../certificates/localhost+2.pem"),
};

app.prepare().then(() => {
  const server = express();

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  https.createServer(httpsOptions, server).listen(3001, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log("server is running on port 3001");
  });
});
