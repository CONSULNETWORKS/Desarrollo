// app/routes/auth2fa.routes.js
const speakeasy = require('speakeasy');
// Asume que `secret` se define en otro lugar o se carga dinámicamente,
// por ejemplo, desde una base de datos o un archivo de configuración.
// Aquí lo dejo como una variable de ejemplo:
const secret = { base32: process.env.SPEAKEASY_SECRET || 'YOUR_SUPER_SECRET_BASE32_KEY' };
//const secret = { base32: process.env.SPEAKEASY_SECRET || 'YOUR_SUPER_SECRET_BASE32_KEY' };
module.exports = (app) => {
  // Verifica el token ingresado por el usuario
  app.post('/verify', (req, res) => {
    const { token } = req.body;
    const verified = speakeasy.totp.verify({
      secret: secret.base32,
      encoding: 'base32',
      token,
    });
    if (verified) {
      res.json({ verified: true });
    } else {
      res.json({ verified: false });
    }
  });
};