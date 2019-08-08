const express = require("express");
const routes = express.Router();

routes.get("/", (request, response) => {
    return response.json({ message: `Olá ${request.query.name}` });
});

routes.post("/devs", (request, response) => {
    return response.json(request.body);
});


module.exports = routes;