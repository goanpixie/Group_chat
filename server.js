var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

var previous_messages=[];
io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);

  socket.on("new_person",function(data){
    io.emit('user_in_chatroom',{response:data.person});
    socket.emit('previous_messages',{response1:previous_messages})

  });

  socket.on("input_message",function(data){
    var newmessage = " "+data.name+": "+data.message
    previous_messages.push(newmessage);
    console.log(previous_messages);
    io.emit('info', {response: newmessage});
  });




});
