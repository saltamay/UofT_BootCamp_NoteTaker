const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('public'))

const PORT = 8080;

app.get('/', (req, res, next) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res, next) => {
    res.status(200).sendFile(__dirname + '/public/notes.html');
});

app.get('/api/notes', (req, res, next) => {
    try {
        fs.readFile(__dirname + '/db/db.json', 'utf-8', (err, data) => {
            if (err) {
                throw Error(err);
            }

            const jsonData = JSON.parse(data);
            res.status(200).send(jsonData);
        })
    } catch (err) {
        console.error(err);
        res.status(404).send();
    }

})

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))
