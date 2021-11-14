const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require("./routes/user");
const app = express();
var http = require('http').Server(app);
var cors = require('cors');
var io = require('socket.io')(http);
const InitiateMongoServer = require("./config/db");
const Messages = require("./Messages");
const Channel = require("./Channel");

InitiateMongoServer();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

var rooms = [];

Channel.find({}, function(err, channels) {
    channels.forEach(function(channel) {
        rooms.push(channel.chanelName);
    });
});
var usernames = {};

io.sockets.on('connection', function (socket) {
    const pseudo = socket.request._query.pseudo;
    const room = socket.request._query.room;

    socket.username = pseudo;
    socket.room = room;
    usernames[pseudo] = pseudo;
    socket.join(room);
    socket.emit('updatechat', 'SERVER', `you join ${room}`);
    socket.broadcast.to(room).emit('updatechat', 'SERVER', pseudo + ' has connected to this room');
    socket.emit('updaterooms', rooms, room);

    socket.on('removeChannel', function (data) {
        console.log(data);
        rooms = rooms.filter(e => e !== data);
        Channel.deleteOne({ chanelName: data }, function (err) {
            if (err) return console.log(err);
        });
        socket.emit('updaterooms', rooms, "Channel 1");
    });

    socket.on('sendchat', function (data) {
        const pseudo = socket.username;
        const channel = socket.room;
        let message = new Messages({
            pseudo,
            data,
            channel
        });
        message.username = pseudo;
        message.message = data;
        message.chanelName = channel;
        console.log(message);
        message.save();
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });

    socket.on('switchRoom', function(newroom){
        if (!rooms.includes(newroom)) {
            let channel = new Channel();
            channel.username = socket.username;
            channel.chanelName = newroom;
            channel.save();
            rooms.push(newroom);
        }
        socket.leave(socket.room);
        socket.join(newroom);
        socket.emit('updatechat', 'SERVER', 'you join '+ newroom);
        socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
        socket.emit('updaterooms', rooms, newroom);
    });

    socket.on('disconnect', function(){
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

http.listen(3000, function(){
    console.log("Server running on 3000")
});
