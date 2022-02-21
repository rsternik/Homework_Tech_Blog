// Required NODE dependencies
const { Model, DataTypes } = require('sequelize');
// Database Connection
const sequelize = require('../config/connection');
// Model Extender
class Comment extends Model { }
///  Comment Initilization using sequelize 
//          Properties   
//          - id
//          - comment_text
//          - post_id
//          - user_id
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'comment',
    }
);
// Export Model
module.exports = Comment;