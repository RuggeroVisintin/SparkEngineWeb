var express = require('express');
var app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000);

console.info('Listening on port 3000');