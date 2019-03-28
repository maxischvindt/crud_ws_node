const {Client} = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

function setCORSHeaders(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, X-Signature, Access-Control-Request-Headers");

    if ('OPTIONS' === req.method) { res.sendStatus(200) }
    
}

let client = null;
const app = express();

app.use(bodyParser.json({limit: '50mb'}));

// Middleware
app.use('*', function (req, res, next) {
    setCORSHeaders(req, res);
    next();
});

app.all('/', function(req, res) {
    res.send('https://github.com/Cuchu/crud_ws_node');
    res.end();
});

app.get('/list-account', async (req, res) => {
    const query = {text: 'SELECT * FROM account'}
    let resp = {result: true, accounts: []}

    try {
        const result = await client.query(query);
        resp.accounts = result.rows;
    } catch(err) {
        resp.result = false;
    }

    console.log('OK /list-account' ,resp);
    res.json(resp);
    res.end();
});

app.post('/create-account', async (req, res) => {
    let email = req.body.email;
    let resp = {result: true}
    
    if(email) {
        const query = {text: 'INSERT INTO account(email) VALUES($1)',values: [email]}

        try {
            const result = await client.query(query);
        } catch(err) {
            resp.result = false;
        }
          
        console.log('OK /create-account', resp);
        res.json(resp);
    } else {
        res.statusCode = 400;
        res.statusMessage = 'Email is required';
    }
    
    res.end();
});

app.put('/update-account', async (req, res) => {
    let params = req.body;
    let resp = {result: true}
    
    if(params.id && params.email && params.newEmail) {
        
        const query = {text: 'UPDATE account SET email = $3 WHERE id = $1 AND email = $2;',values: [params.id, params.email, params.newEmail]}

        try {
            const result = await client.query(query);
            if(result.rowCount > 0) resp.result = true;
        } catch(err) {
            resp.result = false;
        }
        
        res.json(resp);
        console.log('OK /update-account', resp);
    } else {
        res.statusCode = 400;
        res.statusMessage = 'Parameters id, email and newEmail are required';
    }
    
    res.end();
});

async function start() {
    client = new Client({connectionString: config.url_postgresql})
    client.connect()
    
    app.listen(config.port);
    
    console.log("Connected to",config.url_postgresql);
    console.log("Server is listening to port",config.port);
}
  
start();