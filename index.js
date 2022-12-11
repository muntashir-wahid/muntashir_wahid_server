const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from MW server!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6ayglwi.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const db = client.db("muntashir_wahid");
    const skillsCollection = db.collection("skills");
    const projectsCollection = db.collection("projects");

    app.get("/api/v1/skills", async (req, res) => {
      const query = {};
      const skills = await skillsCollection.find(query).toArray();

      res.status(200).json({
        success: true,
        data: {
          skills,
        },
      });
    });

    app.get("/api/v1/projects", async (req, res) => {
      const query = {};
      const projects = await projectsCollection
        .find(query)
        .project({ name: 1, pictures: 1, about: 1, links: 1 })
        .toArray();

      res.status(200).json({
        success: true,
        data: {
          projects,
        },
      });
    });

    app.get("/api/v1/projects/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };

      const project = await projectsCollection.findOne(filter);

      res.status(200).json({
        success: true,
        data: {
          project,
        },
      });
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`MW server is listening on prot ${port}`);
});
