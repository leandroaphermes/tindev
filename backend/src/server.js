const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

/* Configs */
const mongodbconfig = require("../configs/mongodb");



const routes = require("./routes");

const server = express();

mongoose.connect(mongodbconfig, {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);


server.listen(3333);

