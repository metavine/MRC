var io = require('socket.io-client');
var glob = require('glob');

var client = {type:1, id:2, name:"mrc-prototype"};

// 1. connect to Metavine server
var socket = io.connect('https://ericdev.metavine.com/');

socket.emit('test', "");

// 2. register mrc client
// TODO
socket.emit('register', client);

// 3. verify client, make sure it is a legit client that is authenticated
// TODO

// 4. events
// this is the end point of data flow, only accepting data request then
// return results
socket.on('mrc-query', function (query) {
    
    console.log("recieve query: " + query.type + ", " + query.host + ", " + query.info);
    
    // TODO
    // check the requesting host, make sure it comes to the right place
    // if (query.host == '')
    
    // do the query
    // query type >=99 require no response 
    if (query.type < 99) {
            
        var json = "{\"result\":{\"database\":[]}}";
        var ret = 1;
    
        if (query.type == 0) {
            // hard coded for testing
            var database_dir = '/Users/eric/workspace/metavine/metavine-mrc/db/files';
            console.log("loading database from: " + database_dir);
            
            glob(database_dir + "/*", function(er, files) {
                json = "{\"result\":{";
                json += "\"database\":[";
                
                var list = "";
                for (var i = 0; i < files.length; i++) {
                    if (i > 0)
                        list += ','; //list.concat(',');
                    list += "\"" + files[i] + "\"";
                }
                json += list; //files.join(",") +;
                json += "]}}"; 
                
                socket.emit("mrc-result", {success:ret, json:json});
            });
            
        }
        // query tables
        else if (query.type == 1) {
            
        }
        // query with sql
        else if (query.type = 2) {
            
        }
        else {
            ret = 0;
            json = "{\"result\": \"error - unknown query type\"}";
        }
        
    }
});
/*// on every message recived we print the new datas inside the #container div
socket.on('notification', function (data) {
    // convert the json string into a valid javascript object
    var _data = JSON.parse(data);

//        $('#container').html(_data.test.sample);
//        $('time').html('Last Update:' + new Date());

    console.log(_data.test.sample);
    console.log('Last Update:' + new Date());
});*/