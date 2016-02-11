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

<<<<<<< HEAD
// 2. verify client, make sure it is a legit client that is authenticated
socket.on

=======
// 4. events
socket.on('mrc-query', function (query) {
    
    var json = null;
    var ret = 1;
    
    // query databases
    if (query.type == 0) {
        // hard coded for testing
        var database_dir = '/Users/eric/workspace/metavine/metavine-mrc/db/files';
        glob(database_dir + "/*", 'nonull', function(er, files) {
            json = "{result:{";
            json += "database:[" + files.join(",") + "]"; 
            json += "}";
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
        json = "{result: \"error - unknown query type\"}";
    }
    
    socket.emit("mrc-result", {success:ret, json:json});
});
>>>>>>> e5d3a8208fac6fdfbec0f45ab6cdc82e4cd61134
/*// on every message recived we print the new datas inside the #container div
socket.on('notification', function (data) {
    // convert the json string into a valid javascript object
    var _data = JSON.parse(data);

//        $('#container').html(_data.test.sample);
//        $('time').html('Last Update:' + new Date());

    console.log(_data.test.sample);
    console.log('Last Update:' + new Date());
});*/