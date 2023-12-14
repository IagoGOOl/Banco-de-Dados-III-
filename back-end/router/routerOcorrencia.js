const express = require("express");

const {
    criaOcorrencia,
    listarOcorrencia,
    buscarPorId,
    atualizarCordenada,
    deletarCordenada,
} = require("../controller/ocorrenciaController");

const router = express.Router();

router.route("/ocorrencia").post(criaOcorrencia).get(listarOcorrencia);

router
    .route("/ocorrencia/:id")
    .get(buscarPorId)
    .patch(atualizarCordenada)
    .delete(deletarCordenada);

module.exports = { routerOcorrencia: router };
