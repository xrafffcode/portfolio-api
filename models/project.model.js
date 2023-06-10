const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Project = sequelize.define('project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    github: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
}, {
    tableName: 'projects'
});

module.exports = Project;

