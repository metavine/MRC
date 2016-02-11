var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  parser = new require('xml2json'),
  fs = require('fs');

// creating the server ( localhost:9999 )
app.listen(9999);

console.log('server listening on localhost:9999');

// serving html to the web client
function handler(req, res) {
  fs.readFile(__dirname + '/client.html', function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading client.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

// maintain a request table for whom is requesting what

// creating a new websocket then wait for connection
io.sockets.on('connection', function(socket) {
    
  // 1. to see who is connecting
  console.log("connection attempted: " + socket.id);
  
  // test message
  socket.on('test', function(data) {
      console.log("test message recieved.");
  });
  
  // 2. accept client registragion
  // 2.1 web client
  socket.on('register', function(data) {
      
      console.log("client " + data.id + " registering");
      
      if (data.type == 0) {
         console.log("Metavine app connected: " + data.name);
      
      }
      else if (data.type == 1) {
            // 2.2 mrc client
            // 
            // TODO, verify mrc
        console.log("MRC connected: " + data.name);
      }
  });

  // on recieving query from web client / Metavine App
  socket.on('mrc-query', function(query) {
  });
  
  // on recieving result from MRC
  // find the right web client to send the result to
  socket.on('mrc-result', function(result) {
    //   var json = null;
      
/*      if (data.type == 1) {
          
      }
      else {
          json = "{\"result\": \"error - unknown query type\"}";
      }*/
      //TODO
      // reponse to the right web client 
      socket.volatile.emit("app-result", result);
  });
  
  // OK, wait for a while for the client registration
  // if it is not authorised client we disconnect it
  // socket.disconnect();
  
  // watching the xml file
/*  fs.watchFile(__dirname + '/example.xml', function(curr, prev) {
    // on file change we can read the new xml
    fs.readFile(__dirname + '/example.xml', function(err, data) {
      if (err) throw err;
      // parsing the new xml data and converting them into json file
      var json = parser.toJson(data);
      // send the new data to the client
      socket.volatile.emit('notification', json);
    });
  });*/

});