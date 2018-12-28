const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});

router.post("/", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({ text: req.body.text, createdAt: new Date() });
  res.sendStatus(201);
});

router.delete("/:id", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.sendStatus(200);
});

async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://abc123:123abc@cluster0-shard-00-00-eb315.mongodb.net:27017,cluster0-shard-00-01-eb315.mongodb.net:27017,cluster0-shard-00-02-eb315.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    { useNewUrlParser: true }
  );

  return client.db("vue_express").collection("posts");
}

module.exports = router;
