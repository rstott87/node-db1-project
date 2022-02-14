const express = require("express");
const router = require(`../api/accounts/accounts-router`)
const server = express();


server.use(express.json());

server.use('/api/accounts', router)

server.use('*', (req,res) => {
    res.status(404).json({
        message: 'not found',
    })
})  // {note - fall back default }

module.exports = server;
