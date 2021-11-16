const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require("express-rate-limit");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const SensorData = sequelize.define('sensor-data', {
    serial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10 // limit each IP to 10 requests per windowMs
  });

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(limiter);

app.get('/data', async (req, res) => {
    try {
        const allData = await SensorData.findAll();
        res.status(200).send(allData);
    } catch (error) {
        console.log(error);
    }
    return;
});

app.post('/data', async (req, res) => {
    try {
        let data = req.body;
        const sensorData = await SensorData.create(data);
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
    }
    return;
});

app.listen({ port: 8080 }, () => {
    try {
        sequelize.authenticate();
        console.log('connected to database');

        sequelize.sync({ alter: true });
        console.log('synchronized to database');
    } catch (error) {
        console.log('could not connect to database', error);
    }
    console.log('server is running');
});