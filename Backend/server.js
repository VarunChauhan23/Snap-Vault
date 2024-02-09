const express = require('express');
require("dotenv").config({ path: './config.env' });
const connectToMongo = require('./db');
const app = express();
const port = process.env.app_Port
const cors = require('cors')

connectToMongo();

app.use(cors({
  origin: ['https://snap-vault.vercel.app'],
  methods: ['GET','PUT','POST','DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Available routes are -->
app.use('/api/auth', require('./routes/auth'));
app.use('/api/image', require('./routes/images'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;