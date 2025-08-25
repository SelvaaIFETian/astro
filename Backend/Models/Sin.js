// models/Sin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sin = sequelize.define('Sin', {
  postId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Sin;
