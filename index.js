const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

//middel ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1dr0c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
  try{
    await client.connect();
    const todoCollection  = client.db('todo_app').collection('list'); 


    //get data all list 
    app.get('/list', async(req, res) => {
      const query = {};
      const cursor = todoCollection.find(query)
      const lists = await cursor.toArray();
      res.send(lists)
  });

     //insert data
     app.post('/list', async(req, res) => {
      const newList = req.body;
      const result = await todoCollection.insertOne(newList);
      res.send(result);
  })


  }
  finally{
    
  }
}
run().catch(console.dir);







app.get("/", (req, res) => {
  res.send("Hello World! todo");
});

app.listen(port, () => {
  console.log(`to do ${port}`);
});
