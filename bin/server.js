const express = require("express");
const http = require("http");
const path = require("path");
const debug = require("debug")("loja-app:server");

const port = normalizePort(process.env.PORT || 3000);

const app = express();

app.set("port", port);
const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

app.use(express.static("./dist/loja"));
app.get("*", function(req, res) {
  var options = {
    root: path.join(__dirname, "./dist/loja")
  };
  return res.sendFile("./index.html", options);
});

console.log("API rodando na porta: " + port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on" + bind);
}
