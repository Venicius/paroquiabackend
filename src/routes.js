const express = require("express");
const uauthRoutes = express.Router();
const authRoutes = express.Router();
const MissasController = require("./controllers/missasController");
const SenhasController = require("./controllers/senhasController");
const auth = require("./auth");

authRoutes.use(auth);
authRoutes.post("/missas", MissasController.createMissa);
uauthRoutes.get("/missas", MissasController.listMissas);
authRoutes.put("/missas/:id", MissasController.updateMissa);
uauthRoutes.get("/missas/:id", MissasController.listMissaById);

uauthRoutes.post("/senhas", SenhasController.solicitaSenha);
authRoutes.get("/senhas", SenhasController.listSenhas);
authRoutes.put("/senhas/:id", SenhasController.updateSenhas);

exports.uauthRoutes = uauthRoutes;
exports.authRoutes = authRoutes;
