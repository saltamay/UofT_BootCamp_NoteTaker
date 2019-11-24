const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('public'))

const PORT = 8080;

app.get('*', (req, res, next) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
})

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))
