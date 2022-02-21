// Required NODE dependencies
const { Model, DataTypes } = require('sequelize');
// Database Connection
const sequelize = require('../config/connection');
// Model Extender
class Write extends Model {}
///  Write Initilization using sequelize 
//          Properties   
//          - id
//          - title
//          - body
//          - user_id
Write.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'write',
  }
);
// Export Model
module.exports = Write;