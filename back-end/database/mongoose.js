require('dotenv').config();
const mongoose =require('mongoose')

main().catch((err) => console.error(err));

async function main() {
	await mongoose.connect(process.env.MONGO_URL);
	console.log('Conectado com o Mongo');
}
module.exports = mongoose;
