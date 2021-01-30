var express = require('express');
var cors = require('cors');
var ytdl = require('ytdl-core');
var app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/api/', (req, res) => {
    res.status(200).json({
        hello: 'world'
    });
});

app.get('/api/get', async (req, res) => {
    var query = req.query.url;
    var isValidURL = ytdl.validateURL(query);
    if(!isValidURL) {
        res.send('404 | INVALID YOUTUBE URL');
    }
    else {
        var infos = await ytdl.getInfo(req.query.url);
        var title = infos.videoDetails.title;
        res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
        ytdl(query, {
            format: 'mp3'
        }).pipe(res);
    }
});

app.listen(8080);