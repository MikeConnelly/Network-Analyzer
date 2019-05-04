const express = require('express');
const speedTest = require('speedtest-net');
const port = 3000;
const app = express()

app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log(`listening on port ${port}`));
