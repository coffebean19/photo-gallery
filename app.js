const express = require('express');
const app = express();

app.use(express.static(__dirname + '/www'))

app.use('/styles', express.static(__dirname + '/www/styles'));
app.use('/scripts', express.static(__dirname + '/www/scripts'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/login/:username&:password', (req, res) => {
    try
    {
        let username = req.params.username;
        let password = req.params.password;
        let dbPassword = "";

        var Connection = require('tedious').Connection;  
        var config = {  
            server: 'project-323.database.windows.net',  //update me
            authentication: {
                type: 'default',
                options: {
                    userName: 'coffeebean', //update me
                    password: 'Simpel projek!2'  //update me
                }
            },
            options: {
                // If you are on Microsoft Azure, you need encryption:
                encrypt: true,
                database: 'photo-gallery'  //update me
            }
        }; 
        var connection = new Connection(config);  
        connection.on('connect', function(err) {  
            // If no error, then good to proceed.  
            console.log("Connected");  
            executeStatement();  
        });  
        
        connection.connect();
      
        var Request = require('tedious').Request;  
        var TYPES = require('tedious').TYPES;  
      
        function executeStatement() {  
            request = new Request(`SELECT * FROM dbo.[User] WHERE [Username]='${username}'`, function(err) {  
            if (err) {  
                console.log(err);}  
            });  
            var result = "";  
            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                  if (column.value === null) {  
                    console.log('NULL');  
                  } else {  
                    result+= column.value + " ";  
                  }  
                });  
                console.log(result);
                dbPassword = columns[2].value.trim();
                result ="";  
            });  
      
            request.on('done', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');  
            });  
            
            // Close the connection after the final event emitted by the request, after the callback passes
            request.on("requestCompleted", function (rowCount, more) {
                connection.close();

                console.log(`Is ${dbPassword} == ${password}? ${ dbPassword == password }`)
                if (dbPassword == password) {
                    res.status(200).json({
                        logged: "true"
                    })
                }else {
                    res.status(200).json({
                        logged: "false"
                    });
                }
            });
            connection.execSql(request);  
        }          

    } catch(err) {
        res.status(400).json({
            message: "Some error occured",
            err
        })
    }
})

app.get('/signup/:username&:password', (req, res) => {
    try
    {
        let username = req.params.username;
        let password = req.params.password;
        let message = "success";

        //Start of try to connect to database

        var Connection = require('tedious').Connection;  
        var config = {  
            server: 'project-323.database.windows.net',  //update me
            authentication: {
                type: 'default',
                options: {
                    userName: 'coffeebean', //update me
                    password: 'Simpel projek!2'  //update me
                }
            },
            options: {
                // If you are on Microsoft Azure, you need encryption:
                encrypt: true,
                database: 'photo-gallery'  //update me
            }
        };  
        var connection = new Connection(config);  
        connection.on('connect', function(err) {  
            // If no error, then good to proceed.
            console.log("Connected");  
            createUser();

            console.log("outside: " + message);

            res.status(200).json({
                message: message
            })
        });

//End of trying to connect to database
        var Request = require('tedious').Request  
        var TYPES = require('tedious').TYPES;  
  
        function createUser() {  
            request = new Request(`INSERT INTO dbo.[User] (Username, Password) VALUES ('${username}', '${password}');`, function(err) {  
             if (err) {  
                message = "failed";
                console.log(err);
                console.log(message);                
                }  
            });  

            request.addParameter('Username', TYPES.NVarChar, username);  
            request.addParameter('Password', TYPES.NVarChar , password); 
            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                  if (column.value === null) {  
                    console.log('NULL');  
                  } else {  
                    console.log("Product id of inserted item is " + column.value);  
                  }  
                });  
            });

            // Close the connection after the final event emitted by the request, after the callback passes
            request.on("requestCompleted", function (rowCount, more) {
                console.log("User added.");
                connection.close();
            });

            connection.execSql(request);  
        }

        connection.connect();

    } catch(err) {
        res.status(400).json({
            message: "failed",
            err
        })
    }
})

app.get('/home/:username&:filePath', (req, res) => {
    console.log(req.params);
    try {
        res.status(200).json({
            message: "We made it!"
        })
    } catch(err) {
        res.status(400).json({
            message: "Its fucked",
            err
        })
    }
});

app.listen(port, () => {
    console.log('Listening over port:  ' + port);
})