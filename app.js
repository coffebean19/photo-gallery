const express = require('express');
const app = express();

app.use(express.static(__dirname + '/www'))

app.use('/styles', express.static(__dirname + '/www/styles'));
app.use('/scripts', express.static(__dirname + '/www/scripts'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/login', (req, res, next) => {
    var postData = req.body;
    var username = req.body.username;
    var password = req.body.password;
    var htmlData = "hello: " + username + "; password: " + password;
    console.log(postData + " " + htmlData);
    next();
})

app.get('/login', (req, res) => {
    try
    {
        res.status(200).json({
            data: "it works!"
        });
    } catch(err) {
        res.status(400).json({
            message: "Some error occured",
            err
        })
    }
})

app.get('/login/:username', (req, res) => {
    try
    {
        console.log(req.params);
        res.status(200).json({
            data: req.params.username
        });
    } catch(err) {
        res.status(400).json({
            message: "Some error occured",
            err
        })
    }
}) 

app.listen(3000, () => {
    console.log('Listening over port 3000');
})