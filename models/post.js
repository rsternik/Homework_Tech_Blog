// Sequelize & Connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Post extends Model {}
///  Write Initilization using sequelize 
//          Properties   
//          - id
//          - title
//          - body
//          - user_id
Post.init(
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
    modelName: 'post',
  }
);
// Export
module.exports = Post;
