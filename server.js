var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  parser = require('xml2json'),
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
// 1 success, 
var result = {success:0, json:"{\"result\":\"\"}"};
          
var app_client_id = null;
var mrc_client_id = null;
    
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
      
      console.log("client " + data.name + "(" + data.id + ") registering");
      
      if (data.type == 0) {
         app_client_id = socket.id;
         
         console.log("Metavine app connected: " + app_client_id + ", " + data.name);
      }
      else if (data.type == 1) {
            // 2.2 mrc client
            // 
            // TODO, verify mrc
        // send out a test message
                
        mrc_client_id = socket.id;
        
        socket.volatile.emit('mrc-query', {type:99, host:"test", info:"hello there"});
        
        io.to(mrc_client_id).emit('mrc-query', {type:99, host:"test", info:"now you are connected with the App"});

        console.log("MRC connected: " + mrc_client_id + ", " + data.name);
      }
  });

  // on recieving query from web client / Metavine App
  socket.on('app-query', function(query) {
      
      console.log("recieve app query, and pass it on to MRC");
      io.volatile.emit('mrc-query', {type:100, host:"test", info:"wake up dudes, are you there?"});
      
      // at the moment we only X types of query
      if (query.type >= 0 && query.type <=5) {
          console.log("query type verified, sending it to " + mrc_client_id);
          
          io.to(mrc_client_id).emit('mrc-query', query);
      }
      else {
          console.log("unknown query type.");

          var _json = "{\"result\": \"error - unknown query type\"}";
          result.json = _json;
          // do nothing
          io.to(app_client_id).emit("app-result", result);
      }
  });
  
  // on recieving result from MRC
  // and then passing it on to Metavine App
  // find the right web client to send the result to
  socket.on('mrc-result', function(result) {
      console.log("result from MRC recieved: " + result.json);
    //   var json = null;
      
/*      if (data.type == 1) {
          
      }
      else {
          json = "{\"result\": \"error - unknown query type\"}";
      }*/
      //TODO
      // reponse to the right web client 
      io.to(app_client_id).emit("app-result", result);
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