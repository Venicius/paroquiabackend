const db = require("../database/connection");
const nodemailer = require("nodemailer");
const { text } = require("body-parser");

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
    notificaSolicitacaoDeSenha(senha);
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

async function notificaSolicitacaoDeSenha(res) {
  const user = "senhaparamissa@outlook.com";
  const pass = process.env.PASS;

  const mensagem =
    "Nova senha solicitada para " +
    res.nome +
    " com número de Whatsapp: " +
    res.whatsapp;
  console.log(mensagem);

  const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user,
      pass,
    },
  });

  const email = {
    from: user,
    to: "venicius.alves@gmail.com",
    subject: "[SENHA PARA MISSA]",
    text: mensagem,
  };

  transporter.sendMail(email, (err, result) => {
    if (err) return console.log(err);
    console.log("Mensagem enviada!!!!");
  });
}

exports.listSenhas = listSenhas;
exports.updateSenhas = updateSenhas;
exports.solicitaSenha = solicitaSenha;
