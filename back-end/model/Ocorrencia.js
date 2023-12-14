const { mongoose } = require("../database/conectar");
const { Schema } = mongoose;

const ocorrenciaSchema = new Schema({
    titulo: String,
    data: Date,
    hora: String,
    tipo: {
        type: String,
        enum: ["assalto", "furto", "homicidio", "latrocinio"],
        default: "assalto",
    },
    cordenada: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

const Ocorrencia = mongoose.model("Ocorrencia", ocorrenciaSchema);

module.exports = Ocorrencia;
