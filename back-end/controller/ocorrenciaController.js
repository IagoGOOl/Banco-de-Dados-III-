const ocorrenciaModel = require('../model/Ocorrencia');







async function listarOcorrencia(req, res) {
	const policia = await ocorrenciaModel.find({});
	res.status(200).send(policia);
}

async function criaOcorrencia(req, res) {
	const { titulo, tipo, data, hora, lat, lng } = req.body;

	const cordenada = {
		type: 'Point',
		coordinates: [lat, lng],
	};

	const ocorrencia = new ocorrenciaModel({
		titulo,
		tipo,
		data,
		hora,
		cordenada,
	});

	ocorrencia
		.save()
		.then(() => {
			res.status(201).json(ocorrencia);
		})
		.catch((error) => {
			res.status(400).json({ erro: 'falha ao salvar.' });
			console.error(error);
		});
}

async function deletarCordenada(req, res) {
	const { id } = req.params;
	const ocorrencia = await ocorrenciaModel.findByIdAndDelete(id);

	if (!ocorrencia) {
		res.status(404).json({ erro: 'ocorrencia não encontrado' });
		return;
	}

	await ocorrenciaModel.findByIdAndDelete(id);
	res.status(204).json({ mensagem: 'ocorrencia removido com sucesso' });
}

async function atualizarCordenada(req, res) {
	const { id } = req.params;
	const { body } = req;

	try {
		const ocorrencia = await ocorrenciaModel.findByIdAndUpdate(id, body, {
			new: true,
		});

		if (!ocorrencia) {
			return res.status(404).json({ erro: 'ocorrencia não encontrado' });
		}

		return res.status(200).json(ocorrencia.toJSON());
	} catch (error) {
		console.error('Erro durante a atualização:', error);
		return res.status(500).json({ erro: 'Erro interno do servidor' });
	}
}

async function buscarPorId(req, res) {
	const ocorrencia = await ocorrenciaModel.findById(req.params.id);

	if (!ocorrencia) {
		res.status(404).json({ erro: 'ocorrencia não encontrado' });
		return;
	}

	res.status(200).json(ocorrencia);
}

/*async function salvarRascunho(req, res) {
	const nomeTeste = req.nome;
  	const key = `ocorrencia:rascunho:${nomeTeste}`;
	const { titulo, tipo, data, hora, lat, lng } = req.body;
	const cordenada = {
		type: 'Point',
		coordinates: [lat, lng],
	};
	const ocorrenciaRascunho = new ocorrenciaModel({
		titulo,
		tipo,
		data,
		hora,
		cordenada,
	});
	client.set(key, JSON.stringify(ocorrenciaRascunho), 'ex', 3600);
}*/

async function salvarRascunho(req, res) {
	const nomeTeste = req.nome;
	const key = `ocorrencia:rascunho:${nomeTeste}`;
	const { titulo, tipo, data, hora, lat, lng } = req.body;
	const cordenada = {
	  type: 'Point',
	  coordinates: [lat, lng],
	};
	const ocorrenciaRascunho = new ocorrenciaModel({
	  titulo,
	  tipo,
	  data,
	  hora,
	  cordenada,
	});
  
	const redis = require("redis");


	const client = redis.createClient({
		password: '4imBPh4k2va56sQc4bDpv0hqyxDjEBhq',
		socket: {
			host: 'redis-17641.c321.us-east-1-2.ec2.cloud.redislabs.com',
			port: 17641
    }
	});

	await client.connect();
  
	client.set(key, JSON.stringify(ocorrenciaRascunho), 'ex', 3600);
  }


  //testando a função salvar rascunho
  const req = {
	nome: 'ocorrencia X',
	body: {
	  titulo: 'Ocorrência de teste',
	  tipo: 'Roubo',
	  data: new Date(),
	  hora: '12:00',
	  lat: -15.826863,
	  lng: -47.982304,
	},
  };
  
  salvarRascunho(req);
  console.log('salvo')

module.exports = {
	criaOcorrencia,
	listarOcorrencia,
	buscarPorId,
	atualizarCordenada,
	deletarCordenada,
	salvarRascunho,
};
