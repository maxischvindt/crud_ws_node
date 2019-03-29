const {Client} = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const uuidv1 = require('uuid/v1');

function setCORSHeaders(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, X-Signature, Access-Control-Request-Headers");

    if ('OPTIONS' === req.method) { res.sendStatus(200) }
    
}

async function executeQuery(query) {
    try {
        const result = await client.query(query);
        if(result.rowCount > 0) return true;
    } catch(err) {}

    return false;
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
    let resp = {result: false}
    const id = uuidv1();

    if(email) {

        const query = {text: 'INSERT INTO account(id,email) VALUES($1,$2)',values: [id,email]}

        resp.result = await executeQuery(query);
          
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
    let resp = {result: false}
    
    if(params.id && params.email && params.newEmail) {
        
        const query = {text: 'UPDATE account SET email = $3 WHERE id = $1 AND email = $2;',values: [params.id, params.email, params.newEmail]}

        resp.result = await executeQuery(query);
        
        res.json(resp);
        console.log('OK /update-account', resp);
    } else {
        res.statusCode = 400;
        res.statusMessage = 'Parameters id, email and newEmail are required';
    }
    
    res.end();
});

app.delete('/delete-account', async (req, res) => {
    let params = req.body;
    let resp = {result: false}
    
    if(params.id && params.email) {
        
        const query = {text: 'DELETE FROM account WHERE id = $1 AND email = $2;', values: [params.id, params.email]}

        resp.result = await executeQuery(query);
        
        res.json(resp);
        console.log('OK /delete-account', resp);
    } else {
        res.statusCode = 400;
        res.statusMessage = 'Parameters id, email are required';
    }
    
    res.end();
});

async function start() {
    client = new Client({connectionString: config.url_postgresql});
    client.connect();
    console.log("Connected to",config.url_postgresql);

    const query = 
    `CREATE TABLE "public"."account" ("id" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "account_email" UNIQUE ("email"), CONSTRAINT "account_id" PRIMARY KEY ("id")) WITH (oids = false);`;

    try {
        await client.query(query);
        console.log("The table public.account has been created.");
    } catch(err) {
        console.log("The table public.account exist.");
    }

    app.listen(config.port);
    console.log("Server is listening to port",config.port);
}
  
start();