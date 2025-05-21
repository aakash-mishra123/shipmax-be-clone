const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connection.mjs');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: 'I am new here!'
    },
    user_type: {
        type: DataTypes.ENUM('C', 'A', 'V'),
        defaultValue: 'C'
    },
    status: {
        type: DataTypes.ENUM('A', 'D'),
        defaultValue: 'A'
    },
    company_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    },
    last_login: DataTypes.DATE,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

module.exports = User;