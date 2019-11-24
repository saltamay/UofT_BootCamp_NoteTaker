const express = require('express');
const fs = require('fs');
const { parse } = require('querystring');

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
});

app.post('/api/notes', (req, res, next) => {
    // Parse incoming request body
    let body = '';
    req.on('data', data => {
        body += data.toString();
    }).on('end', () => {
        const newNote = parse(body);

        if (Object.keys(newNote).length !== 0) {
            fs.readFile(__dirname + '/db/db.json', 'utf-8', (err, data) => {
                if (err) {
                    throw err;
                }

                data = JSON.parse(data);
                data.push(newNote);
                console.log(JSON.stringify(data));

                fs.writeFile(__dirname + '/db/db.json', JSON.stringify(data), err => {
                    if (err) throw err;
                    console.log('Success.')
                });
            })
            res.status(201).send(newNote);
        } else {
            throw new Error('Something went wrong.');
        }
    });
})

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))
