const redis = require("redis");

const client = redis.createClient({
  host: 'redis-17641.c321.us-east-1-2.ec2.cloud.redislabs.com',
  port: 17641,
  password: '4imBPh4k2va56sQc4bDpv0hqyxDjEBhq',
});



client.on("connect", () => {
  console.log("Conectado ao Redis Cloud");

  // Insere um valor no Redis
  client.set("teste", "teste");

  // Obtém um valor do Redis
  const value = client.get("key");

  console.log("O valor é:", value);
});

client.on("ready", () => {
  console.log("Conectado ao Redis Cloud e pronto pra usar");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("ready", () => {
  console.log("Conectado ao Redis Cloud e pronto pra usar");
});

client.on("SIGINT", () => {
  client.quit();
});


module.exports = client;

