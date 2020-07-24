const express = require("express");
// const mongodb = require("mongodb");
const { Pool, Client } = require("pg")

const router = express.Router();

//const connectionString = "postgresql://kpchliqrvskkyg:0e30bfa5a215ef71e27bac32fd70927c9504c1502b76690271a239cdd7f230f6@ec2-174-129-255-21.compute-1.amazonaws.com:5432/d791ucd5o92run";
const client = new Client({
    user: 'kpchliqrvskkyg',
    host: 'ec2-174-129-255-21.compute-1.amazonaws.com',
    password: '0e30bfa5a215ef71e27bac32fd70927c9504c1502b76690271a239cdd7f230f6',
    port:5432,
    database:'d791ucd5o92run',
    ssl: true
  })
client.connect();


//get postgress
router.get("/callPostgres", async (req, res) => {
    console.log("get callPostgres");
    var query = await queryEmployee();
    console.log(query.rowCount);

    res.send(query.rows);
});

async function queryEmployee(){
    let query = "SELECT * from employee";
    return new Promise((resolve, reject) => {

        client.query(query, function(err, results) {
          if (err) {
            throw err;
          }
          resolve(results);
        });

      })
    
}



//get mongo db
router.get("/callMongo", async (req, res) => {
    console.log("get method");
    const posts = await loadCollection();
    res.send(await posts.find({}).toArray());
});

//mongodb+srv://frankenstyll:17022532@cluster0-ksrrb.mongodb.net/test?retryWrites=true&w=majority
async function loadCollection(){
    const client = await mongodb.MongoClient.connect(
        "mongodb+srv://frankenstyll:17022532@cluster0-ksrrb.mongodb.net/test?retryWrites=true&w=majority",
        { useNewUrlParser: true }
    );
    return client.db("sample_airbnb").collection("listingsAndReviews"); 
}


module.exports = router;