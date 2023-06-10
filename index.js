const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');

// Mengecek koneksi ke database
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/v1', routes);

module.exports = app; // Export the 'app' instance

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

