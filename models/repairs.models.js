const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Repair = db.define('repairs', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    date: {
        allowNull: false,
        types: DataTypes.DATE,
    },
    status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Repair;
