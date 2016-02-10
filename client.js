var io = require('socket.io-client');

// 1. connect to Metavine server
var socket = io.connect('https://ericdev.metavine.com/');

// 2. verify client, make sure it is a legit client that is authenticated
// on every message recived we print the new datas inside the #container div
socket.on('notification', function (data) {
    // convert the json string into a valid javascript object
    var _data = JSON.parse(data);

//        $('#container').html(_data.test.sample);
//        $('time').html('Last Update:' + new Date());

    console.log(_data.test.sample);
    console.log('Last Update:' + new Date());
});