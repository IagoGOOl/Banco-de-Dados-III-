const ocorrenciaModel = require("../model/Ocorrencia");

async function listarOcorrencia(req, res) {
    const policia = await ocorrenciaModel.find({});
    res.status(200).send(policia);
}

async function criaOcorrencia(req, res) {
    const { titulo, tipo, data, hora, lat, lng } = req.body;

    const cordenada = {
        type: "Point",
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
            res.status(400).json({ erro: "falha ao salvar." });
            console.error(error);
        });
}

async function deletarCordenada(req, res) {
    const { id } = req.params;
    const ocorrencia = await ocorrenciaModel.findByIdAndDelete(id);

    if (!ocorrencia) {
        res.status(404).json({ erro: "ocorrencia não encontrado" });
        return;
    }

    await ocorrenciaModel.findByIdAndDelete(id);
    res.status(204).json({ mensagem: "ocorrencia removido com sucesso" });
}

async function atualizarCordenada(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
        const ocorrencia = await ocorrenciaModel.findByIdAndUpdate(id, body, {
            new: true,
        });

        if (!ocorrencia) {
            return res.status(404).json({ erro: "ocorrencia não encontrado" });
        }

        return res.status(200).json(ocorrencia.toJSON());
    } catch (error) {
        console.error("Erro durante a atualização:", error);
        return res.status(500).json({ erro: "Erro interno do servidor" });
    }
}

async function buscarPorId(req, res) {
    const ocorrencia = await ocorrenciaModel.findById(req.params.id);

    if (!ocorrencia) {
        res.status(404).json({ erro: "ocorrencia não encontrado" });
        return;
    }

    res.status(200).json(ocorrencia);
}

module.exports = {
    criaOcorrencia,
    listarOcorrencia,
    buscarPorId,
    atualizarCordenada,
    deletarCordenada,
};
