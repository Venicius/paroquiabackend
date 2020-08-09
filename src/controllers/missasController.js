const db = require("../database/connection");

async function listMissas(request, response) {
  const missas = await db("missas");

  return response.status(200).json(missas);
}

async function listMissaById(request, response) {
  const params = request.params;
  const missas = await db("missas").where("id","=",params.id);

  return response.status(200).json(missas);
}

async function createMissa(request, response) {
  const missa = { ...request.body };

  const trx = await db.transaction();
  try {
    const insertedMissasIds = await trx("missas").insert(missa);
    await trx.commit();
    return response.status(201).json({
      id: insertedMissasIds,
    });
  } catch (error) {
    console.log(error);
    await trx.rollback();
    return response.status(400).json({
      error: "Erro Inexperado",
    });
  }
}

async function updateMissa(request, response) {
  const missa = { ...request.body };
  const params = request.params;

  const trx = await db.transaction();
  try {
    await trx("missas").where("id", "=", params.id).update(missa);
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

exports.listMissas = listMissas;
exports.updateMissa = updateMissa;
exports.createMissa = createMissa;
exports.listMissaById = listMissaById;
