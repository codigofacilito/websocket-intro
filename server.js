const express = require('express');
const app = express();

const WebSocketServer = require('websocket').server;

app.use( express.static('public') ); // Enviar el index.html

let server = app.listen(8080,()=> console.log("Server started"));

let webSocketServer = new WebSocketServer({
  httpServer: server
});

let connections = [];

webSocketServer.on('request',function(request){
  console.log("Tenemos visitas 🏠");
  let connection = request.accept('echo-protocol', request.origin);

  connections.push(connection);

  connection.sendUTF("Bienvenido!!");

  connection.on("message",function(message){
    if(message.type == "utf8")
      broadcast(message.utf8Data);
  });

  function broadcast(message){
    connections.forEach(c => c.sendUTF(message));
  }


})