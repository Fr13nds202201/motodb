const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Repairs = db.define('Repairs', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defualtValue: 'pending'
    },
    userid: {
        allowNull: false,
        type: DataTypes.INTEGER
    },


});

module.exports = User;
