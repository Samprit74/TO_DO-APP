const express = require('express');
const app = express();
const port =6020;
const connect_db = require('./db');
const cors = require('cors');
const routes = require('./modles/routes');

//middle wers
app.use(cors());
app.use(express.json());
//database connection
connect_db();


//routes for crud
app.use('/api', routes);
//api end points calling
 
app.get('/server', (req,res) => {
    res.send("hellow world");
})


app.listen (port,() => {
    console.log(`server is running at ${port}`);
})