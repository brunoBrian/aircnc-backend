// index: listar todas as sessoes
// show: listar uma única sessao
// store: criar uma sessao
// update: alterar uma sessao
// destroy: remover ou deletar uma sessao

const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if(!user)
      user = await User.create({ email });

    return res.json(user);
  }
};