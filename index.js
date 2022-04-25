const http = require("http")

const fs = require("fs")
const { handleReqRes } = require('./handler/handleReqRes')

const app={}

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);

  server.listen(5000, err => {
    console.log('Listening To Port Number:' + 5000);
  });
};

//Handle Request/Response
app.handleReqRes = handleReqRes;

//Start The Server

app.createServer();