const express = require('express');
const app = express();

// app.get('/', (req, res) => {
//     res.sendFile('/www/index.html', { root: __dirname});
// });

app.use(express.static(__dirname + '/www'))

app.use('/styles', express.static(__dirname + '/www/styles'));
app.use('/scripts', express.static(__dirname + '/www/scripts'));
// app.use('/', express.static(__dirname + '/www/'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/login', (req, res) => {
    var postData = req.body;
    var username = req.body.username;
    var password = req.body.password;
    var htmlData = "hello: " + username + "; password: " + password;
    res.send(htmlData);
    console.log(postData);
})

app.listen(3000, () => {
    console.log('Listening over port 3000');
})