const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AdminPermission = sequelize.define('AdminPermission', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  adminId: { type: DataTypes.INTEGER, allowNull: false },
  moduleName: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'admin_permissions',
  timestamps: true
});

module.exports = AdminPermission;
