// models/Sin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sin = sequelize.define('Sin', {
  postId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  sinId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Sin;
