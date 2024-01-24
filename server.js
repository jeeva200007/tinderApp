const express = require("express");
const mongoose = require("mongoose");
const Cards = require("./dbCards");
const cors = require("cors");

// App config
const app = express();
const PORT = process.env.PORT || 8001;
const dbConnect = `mongodb://admin:xd45ZGYRqyi28jjr@ac-lburmvt-shard-00-00.6gizh6u.mongodb.net:27017,ac-lburmvt-shard-00-01.6gizh6u.mongodb.net:27017,ac-lburmvt-shard-00-02.6gizh6u.mongodb.net:27017/?ssl=true&replicaSet=atlas-49decv-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Middleware
app.use(express.json());
app.use(cors());

// DB config

async function connectToDatabase() {
  try {
    await mongoose.connect(dbConnect, {});
    console.log("MongoDb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToDatabase();

// Api endPoints
app.get("/", (req, res) => res.send("hello world"));

app.post("/tinder/cards", async (req, res) => {
  try {
    const dbCard = req.body;
    const data = Cards.create(dbCard);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message || "Internal Server Error");
  }
});

app.get("/tinder/cards", async (req, res) => {
  try {
    const data = await Cards.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message || "Internal Server Error");
  }
});

// listener
app.listen(PORT, () => {
  console.log(`The server running on  port ${PORT} `);
});
