// index: listar todas as sessoes
// show: listar uma única sessao
// store: criar uma sessao
// update: alterar uma sessao
// destroy: remover ou deletar uma sessao

const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({
      techs: tech
    });

    return res.json(spots);
  },


  async store(req, res) {
    const { filename } = req.file;
    const { company, price, techs } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if(!user) {
      return res.status(400).json({
        error: "User doesn't exists"
      });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      price,
      techs: techs.split(',').map(tech => tech.trim())
    });

    return res.json(spot);
  }
};