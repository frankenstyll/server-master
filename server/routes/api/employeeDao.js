const express = require("express");
// const mongodb = require("mongodb");
const { Pool, Client } = require("pg")

const router = express.Router();

const client = new Client({
    user: 'kpchliqrvskkyg',
    host: 'ec2-174-129-255-21.compute-1.amazonaws.com',
    password: '0e30bfa5a215ef71e27bac32fd70927c9504c1502b76690271a239cdd7f230f6',
    port:5432,
    database:'d791ucd5o92run',
    ssl: true
  })
client.connect();

router.get("/searchAllEmployee", async (req, res) => {
    var query = await queryEmployee();
    res.send(query.rows);
});

//function db
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

async function queryById(id){
    let query = "SELECT * from employee where  employee_id = " + id;
    return new Promise((resolve, reject) => {
        client.query(query, function(err, results) {
            if (err) {
                throw err;
            }
            resolve(results);
        });
    })
}

async function insert(obj){
    let query = "insert into employee (employee_id,employee_email,employee_role,employee_status)";
    query = query + " values( '"+obj.employee_id+"' , '"+obj.employee_email+"', '"+obj.employee_role+"', '"+obj.employee_status+"')";
    return new Promise((resolve, reject) => {
        client.query(query, function(err, results) {
            if (err) {
                throw err;
            }
            resolve(results);
        });
        client.end();
    })
}


module.exports = router;