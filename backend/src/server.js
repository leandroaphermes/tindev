const express = require('express');
const mongoose = require("mongoose");
const routes = require("./routes");
const mongodbconfig = require("../configs/mongodb");

const server = express();

mongoose.connect(mongodbconfig, {
    useNewUrlParser: true
});


server.use(express.json());
server.use(routes);


server.listen(3333);

