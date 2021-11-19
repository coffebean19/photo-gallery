const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Getting to learn this backend kak');
});

app.listen(3000, () => {
    console.log('Listening over port 3000');
})