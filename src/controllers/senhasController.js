const db = require("../database/connection");
const nodemailer = require("nodemailer");


  async function listSenhas(request, response) {
    const senhas = await db("senhas");

    return response.status(200).json(senhas);
  }
  async function solicitaSenha(request, response) {
    const senha = { ...request.body };

    const trx = await db.transaction();
    try {
      await trx("senhas").insert(senha);

      await trx("missas")
        .where({ id: senha.missa_id })
        .decrement("disponiveis", 1);
      await trx.commit();
      return response
        .status(201)
        .json({ message: "Senha solicitada com sucesso." });
    } catch (error) {
      console.log(error);
      await trx.rollback();
      return response.status(400).json({
        error: "Erro Inexperado",
      });
    }
  }

  async function updateSenhas(request, response) {
    const senha = { ...request.body };
    const params = request.params;

    const trx = await db.transaction();
    try {
      await trx("senhas").where("id", "=", params.id).update(senha);
      await trx.commit();
      return response.status(201).json({
        message: "Operação realizada com sucesso!",
      });
    } catch (error) {
      console.log(error);
      await trx.rollback();
      return response.status(400).json({
        error: "Erro Inexperado",
      });
    }
  }

  async function notificaSolicitacaoDeSenha() {
    const transporter = nodemailer.createTransport({
      host: "smpt.umbler.com",
      port: "",
      auth: {
        user: "teste",
        pass: "pass",
      },
    });
  }

exports.listSenhas = listSenhas;
exports.updateSenhas = updateSenhas;
exports.solicitaSenha = solicitaSenha;
