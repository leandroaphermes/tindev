const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

/* Configs */
const mongodbconfig = require("../configs/mongodb");

const routes = require("./routes");



const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectUsersSocket = { };
io.on("connection", socket => {
    const { user } = socket.handshake.query;
    connectUsersSocket[user] = socket.id;
});


mongoose.connect(mongodbconfig, {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectUsersSocket = connectUsersSocket;
    return next();
});


app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);

