const express = require('express');
const routes = express.Router();
const MissasController = require("./controllers/missasController");
const SenhasController = require("./controllers/senhasController");
routes.post("/missas", MissasController.createMissa);
routes.get("/missas", MissasController.listMissas);
routes.put("/missas/:id", MissasController.updateMissa);

routes.post("/senhas", SenhasController.solicitaSenha);
routes.get("/senhas", SenhasController.listSenhas);
routes.put("/senhas/:id", SenhasController.updateSenhas);

module.exports = routes; 
