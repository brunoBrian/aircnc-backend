// index: listar todas as sessoes
// show: listar uma única sessao
// store: criar uma sessao
// update: alterar uma sessao
// destroy: remover ou deletar uma sessao

const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate('spot');
    booking.approved = false;
    await booking.save();

    const bookingUserSocket = req.connectedUsers[booking.user];

    if (bookingUserSocket) {
      req.io.to(bookingUserSocket).emit('booking_response', booking);
    }

    return res.json(booking);
  }
}