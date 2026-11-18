const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
 const header = req.headers.authorization;
 if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Inicia sesión para continuar.' });
 try { req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET); next(); }
 catch { return res.status(401).json({ message: 'Sesión inválida o expirada.' }); }
};
