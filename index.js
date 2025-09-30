const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcbondo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const db = client.db("dailyPressDB");
    const usersCollection = db.collection("users");
    const publishersCollection = db.collection("publishers");
    const articlesCollection = db.collection("articles");

    // Delete : delete user by admin
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // POST : store articles in the database
    app.post("/articles", async (req, res) => {
      const article = req.body;
      const isExists = await articlesCollection.findOne(article);
      if (isExists) {
        return res.send(200).send({
          message: "Already Registered, Please login.",
          inserted: false,
        });
      }
      const result = await articlesCollection.insertOne(article);
      res.send(result);
    });

    // GET : see all the articles
    app.get("/articles", async (req, res) => {
      const result = await articlesCollection.find().toArray();
      res.send(result);
    });

    // POST : creating publishers ---> Done
    app.post("/publishers", async (req, res) => {
      const name = req.body.name;
      const isPublisher = await publishersCollection.findOne({ name });
      if (isPublisher) {
        return res.send(200).send({
          message: "Already Registered, Please login.",
          inserted: false,
        });
      }
      const publisher = req.body;
      const result = await publishersCollection.insertOne(publisher);
      res.send(result);
    });

    // get : see the publishers
    app.get("/publishers", async (req, res) => {
      const result = await publishersCollection.find().toArray();
      res.send(result);
    });

    // POST : creating user ---> Done
    app.post("/users", async (req, res) => {
      const email = req.body.email;
      const isUser = await usersCollection.findOne({ email });
      if (isUser) {
        return res.status(200).send({
          message: "Already Registered, Please login.",
          inserted: false,
        });
      }
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    // get : see users --> Done
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("this is server homepage");
});

app.listen(port, () => {
  console.log("server running on port : ", port);
});
