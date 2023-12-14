const express = require("express");
const cors = require("cors");

const { routerRascunho } = require("./router/routerRascunho");
const { routerOcorrencia } = require("./router/routerOcorrencia");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routerRascunho);
app.use(routerOcorrencia);

const startup = async () => {
    app.listen(3000, () => {
        console.log("serve ON");
    });
};

startup();
