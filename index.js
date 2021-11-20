const { app, sequelize } = require('./app');

app.listen({ port:8080 }, () => {
    try {
        sequelize.authenticate();
        sequelize.sync({ alter: true });
        console.log('Connected to database');
    } catch (error) {
        console.log('failed to connect to db', error);
    }
    console.log('server started');
});