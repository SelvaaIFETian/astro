const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }
    req.admin = decoded; // you can access admin info via req.admin
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
