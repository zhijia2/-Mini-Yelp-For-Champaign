const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'mypassword',
    database:'411demo',
})

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`RestaurantName`, `movieReview`) VALUES (5,'inception', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`RestaurantName`, `movieReview`) VALUES ('Spider2', 'good movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello world!!!");
//     })
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.post("/api/insert", (require, response) => {
    const RestaurantName = require.body.RestaurantName;
    const movieReview = require.body.movieReview;

    const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
    db.query(sqlInsert, [RestaurantName, movieReview], (err, result) => {
        console.log(error);
    })
});

app.delete("/api/delete/:RestaurantName", (require, response) => {
    const RestaurantName = require.params.RestaurantName;

    const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
    db.query(sqlDelete, RestaurantName, (err, result) => {
        if (err)
        console.log(error);
    })
});

app.put("/api/update/", (require, response) => {
    const RestaurantName = require.body.RestaurantName;
    const movieReview = require.body.movieReview;

    const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
    db.query(sqlUpdate, [movieReview,RestaurantName ], (err, result) => {
        if (err)
        console.log(error);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})
