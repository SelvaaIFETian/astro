const AdminPermission = require('../Models/AdminPermission');

module.exports = async (req, res, next) => {
  try {
    const adminId = req.admin?.id || req.adminId; // from JWT middleware
    const { moduleName, moduleId } = req.body; // or req.params/query

    if (!moduleName || !moduleId) {
      return res.status(400).json({ message: 'moduleName and moduleId are required' });
    }

    // Find permission for this admin and specific module
    const permissionRecord = await AdminPermission.findOne({
      where: {
        adminId,
        moduleName,
        moduleId
      }
    });

    if (!permissionRecord) {
      return res.status(403).json({ message: `No permission to post in ${moduleName} (ID: ${moduleId}) for ${adminId}` });
    }

    // Permission granted, proceed
    next();

  } catch (err) {
    res.status(500).json({ message: 'Permission check failed', error: err.message });
  }
};
