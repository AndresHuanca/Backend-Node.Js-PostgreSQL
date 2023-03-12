const validarMuchaSolicitudes = (err, req, res, next) => {
    if (err.statusCode === 429) {
      // Aquí puedes decidir qué hacer con el error
      res.status(429).json({ message: 'Demasiadas solicitudes, por favor intente nuevamente más tarde' });
    } else {
      next(err);
    }
  };
  
  module.exports = validarMuchaSolicitudes;
  