require("dotenv").config();
const redis = require("redis");
const mongoose = require("mongoose");

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conectado com o Mongo");
}

main().catch((err) => console.error(err));

const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 17641,
    },
});

async function conectar() {
    await client.connect();
    client.on("error", (err) => {
        console.log("Erro: " + err);
    });
    console.log("Conectado com o Redis");
}

conectar();

module.exports = {
    client: client,
    mongoose: mongoose,
};
