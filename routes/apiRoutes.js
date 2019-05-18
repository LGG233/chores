var db = require("../models");

module.exports = function (app) {

    // gets list of users //
    app.get("/api/userGet", function (req, res) {
        db.Users.findAll({}).then(function (dbUsers) {
            res.json(dbUsers);
        })
    })

    // gets list of user specific activities //
    app.get("/api/choresGet/:user_id", function (req, res) {
        db.Chores.findAll({
            where: {
                user_id: req.params.user_id
            }
        }).then(function (dbChores) {
            res.json(dbChores);
        });
    });

    // get data for table displays
    app.get("/api/userdataGet/:user_id", function (req, res) {
        var chores_hbsObject = [];
        var users_hbsObject = [];
        db.Chores.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                user_id: req.params.user_id,
            }
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                chores_hbsObject.push(data[i].dataValues);
            }
        });
        db.Users.findAll({
            where: {
                user_id: req.params.user_id,
            }
        }).then(function (data) {
            res.render("layouts/tables", {
                Chores: chores_hbsObject,
                Users: users_hbsObject
            })
        });
    });

    ////////// POSTS ///////////

    // new user api post
    app.post("/api/userCreate", function (req, res) {
        db.Users.create({
            username: req.body.username,
            password: req.body.password,
            starting_weight: req.body.starting_weight,
            target_weight: req.body.target_weight
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // user specific chore input post
    app.post("/api/chorePost", function (req, res) {
        db.Chores.create({
            user_id: req.body.user_id,
            food_name: req.body.food_name,
            total_cal_con: req.body.total_cal_con
        }).then(function (dbCalories) {
            res.json(dbCalories);
        })
    });

    //"update" current user weight by posting to user weight table.
    app.post("/api/userweightPost", function (req, res) {
        db.Userweights.create({
            user_id: req.body.user_id,
            user_weight: req.body.user_weight,
        }).then(function (dbUserweight) {
            res.json(dbUserweight);
        });
    });
};