const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'34.136.215.26',
    user: 'root',
    password:'12345',
    database:'AISFINE',
})

 // db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`RestaurantName`, `movieReview`) VALUES (5,'inception', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

app.get('/', (require, response) => {
    const sqlInsert = "select  * from Restaurants where restaurantid = 1";
    db.query(sqlInsert, (err, result) => {
        response.send(result);
        console.log("a!");
    })
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM test";
    db.query(sqlSelect, (err, result) => {
        //console.log(result)
        response.send(result);
    });
});

app.post("/api/insert", (require, response) => {
    const RestaurantName = require.body.RestaurantName;
    const RestaurantReview = require.body.RestaurantReview;
    const sqlInsert = "INSERT INTO `test` (`name`, `info`) VALUES (?,?)";
    db.query(sqlInsert, [RestaurantName, RestaurantReview], (err, result) => {
        if (err)
        console.log(error);
    })
});

app.delete("/api/delete/:RestaurantName", (require, response) => {
    const RestaurantName = require.params.RestaurantName;

    const sqlDelete = "DELETE FROM `test` WHERE `name`= ?";
    db.query(sqlDelete, RestaurantName, (err, result) => {
        if (err)
        console.log(error);
    })
});

app.patch("/api/search/", (require, response) => {
  const searchValue = require.body.searchValue;
  const sqlSearch = "select `name`, `overallRating` as `info` from Restaurants where `name` like '%" + searchValue + "%'";
  console.log(searchValue);
  db.query(sqlSearch, searchValue, (err, result) => {
    response.send(result);
    //console.log(result);
  }

  )
}
);

app.put("/api/update/", (require, response) => {
    const RestaurantName = require.body.RestaurantName;
    const RestaurantReview = require.body.RestaurantReview;

    const sqlUpdate = "UPDATE `test` SET `info` = ? WHERE `name`= ?";
    db.query(sqlUpdate, [RestaurantReview,RestaurantName ], (err, result) => {
        console.log(RestaurantReview);
        if (err)
        console.log(error);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})
