const { client } = require("../database/conectar");

const key = `ocorrencias`;

async function salvarRascunho(req, res) {
    const { titulo, tipo, data, hora, lat, lng } = req.body;

    const cordenada = {
        type: "Point",
        coordinates: [lat, lng],
    };

    const ocorrenciaRascunho = {
        titulo,
        tipo,
        data,
        hora,
        cordenada,
    };

    await client.del(key);

    const response = await client.set(
        key,
        JSON.stringify(ocorrenciaRascunho),
        "ex",
        3600
    );

    if (response !== "OK") {
        res.status(400).json({ erro: "Error ao salvar ocorrencia" });
    }

    const rascunho = await client.get(key);

    res.status(201).json(JSON.parse(rascunho));
}

async function recuperarRascunho(req, res) {
    const rascunho = await client.get(key);
    res.json(JSON.parse(rascunho));
}

module.exports = {
    salvarRascunho,
    recuperarRascunho,
};
