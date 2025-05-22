const express = require('express');
const app = express();
const config = require('./config/config');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

readdirSync('./routes').forEach(file => {
    const route = require(`./routes/${file}`);
    app.use("/api/v1", route);
});

app.listen(config.port, () => {
    console.log('\x1b[32m[OK] : Server is running . . .\x1b[0m');
});