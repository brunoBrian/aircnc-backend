// index: listar todas as sessoes
// show: listar uma única sessao
// store: criar uma sessao
// update: alterar uma sessao
// destroy: remover ou deletar uma sessao

const Spot = require('../models/Spot');

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;

    let spots = await Spot.find({ user: user_id });

    return res.json(spots);
  }
};