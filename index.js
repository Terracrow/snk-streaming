var express = require('express');
var cors = require('cors');
var ytdl = require('ytdl-core');
var app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/api/', (req, res) => {
    res.status(200).json({
        hello: 'world'
    });
});

app.listen(8080);