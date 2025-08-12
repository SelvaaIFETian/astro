const AdminPermission = require('../Models/AdminPermission');

module.exports = async (req, res, next) => {
  try {
    const adminId = req.adminId; // from JWT
    const { moduleName } = req.body; // or from params/query

    const hasPermission = await AdminPermission.findOne({
      where: { adminId, moduleName }
    });

    if (!hasPermission) {
      return res.status(403).json({ message: `No permission to post in ${moduleName}` });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Permission check failed', error: err.message });
  }
};
