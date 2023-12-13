const cors = require('cors');
const express = require('express');

const router = express.Router();

const {
	criaOcorrencia,
	listarOcorrencia,
	buscarPorId,
	atualizarCordenada,
	deletarCordenada,
	salvarRascunho,
} = require('../controller/ocorrenciaController');

router.route('/ocorrencia').post(criaOcorrencia).get(listarOcorrencia);

router
	.route('/ocorrencia/:id')
	.get(buscarPorId)
	.patch(atualizarCordenada)
	.delete(deletarCordenada);

router.route('/ocorrencia').post(salvarRascunho);

module.exports = { router };
