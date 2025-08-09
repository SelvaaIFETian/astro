const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Thandhirikam = sequelize.define('Thandhirikam', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'thandhirikams',
  timestamps: true
});

module.exports = Thandhirikam;
