const cors = require('cors');
const express = require('express');

const router = express.Router();

const {
	criaOcorrencia,
	listarOcorrencia,
	buscarPorId,
	atualizarCordenada,
	deletarCordenada,
} = require('../controller/ocorrenciaController');

router.route('/ocorrencia').post(criaOcorrencia).get(listarOcorrencia);

router
	.route('/ocorrencia/:id')
	.get(buscarPorId)
	.patch(atualizarCordenada)
	.delete(deletarCordenada);

module.exports = { router };
