const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bookmark = sequelize.define('Bookmark', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'bookmarks',
  timestamps: true
});

module.exports = Bookmark;
