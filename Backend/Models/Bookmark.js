const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bookmark = sequelize.define('Bookmark', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bookmarkType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: { // name given by the user when creating bookmark
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'bookmarks',
  timestamps: true
});

module.exports = Bookmark;
