const express = require("express");

const router = express.Router();

const {
    salvarRascunho,
    recuperarRascunho,
} = require("../controller/rascunhoControle");

router
    .route("/ocorrencia/rascunho")
    .post(salvarRascunho)
    .get(recuperarRascunho);

module.exports = { routerRascunho: router };
