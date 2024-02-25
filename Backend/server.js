const express = require("express");
require("dotenv").config({ path: "./config.env" });
const connectToMongo = require("./db");
const app = express();
const port = process.env.app_Port;
const cors = require("cors");

connectToMongo().catch(console.dir);

app.use(
  cors({
    origin: "https://snap-vault.vercel.app",
  })
);

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.status(200).end();
});

app.use(express.json());

// Available routes are -->
app.use("/api/auth", require("./routes/auth"));
app.use("/api/image", require("./routes/images"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
