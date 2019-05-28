var db = require("../models");

module.exports = function (app) {

    // gets list of all chores for all users  //
    app.get("/", function (req, res) {
        db.Chores.findAll({}).then(function (dbChores) {
            var hbsObject = {
                Chores: dbChores
            };
            res.render("index", hbsObject);
        })
    })
    // gets list of all users //
    app.get("/api/allUsersGet", function (req, res) {
        db.Users.findAll({
            order: [['createdAt', 'DESC']],
        }).then(function (dbUsers) {
            res.json(dbUsers);
        })
    })

    // gets list of all chores for single user//
    app.get("/api/choresGet/:username", function (req, res) {
        db.Chores.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                username: req.params.username,
            }
        }).then(function (dbChores) {
            var hbsObject = {
                Chores: dbChores
            };
            res.render("index", hbsObject);
        });
    });

    // // gets list of uncompleted chores for user //
    app.get("/api/choresTodoGet/:username", function (req, res) {
        db.Chores.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                username: req.params.username,
                chore_state: false
            }
        }).then(function (dbChores) {
            var hbsObject = {
                Chores: dbChores
            };
            res.render("index", hbsObject);
        });
    });

    // // gets list of completed chores for user //
    app.get("/api/choresDoneGet/:username", function (req, res) {
        db.Chores.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                username: req.params.username,
                chore_state: true
            }
        }).then(function (dbChores) {
            var hbsObject = {
                Chores: dbChores
            };
            res.render("index", hbsObject);
        });
    });


    ////////// POSTS ///////////

    // new choir api post
    app.post("/api/newChore", function (req, res) {
        db.Chores.create({
            username: req.body.username,
            chore: req.body.chore,
            overview: req.body.overview,
            due_date: req.body.due_date
        }).then(function (dbNewChore) {
            res.json(dbNewChore);
        });
    });

    // Change status of chore to "done" //
    app.put("/api/choreStatus/:chore_id", function (req, res) {
        db.Chores.update(
            {
                chore_state: req.body.chore_state
            },
            {
                where: { chore_id: req.params.chore_id }
            })
            .then(function (newStatus) {
                console.log("new chore state is " + req.body.chore_state);
                console.log("chore_id is " + req.params.chore_id);
                console.log("result is this new status: " + newStatus);
                // res.json(newStatus);
            });
    })
}

    // get data for table displays
    // app.get("/api/choresAllGet/:username", function (req, res) {
    //     var chores_todo_hbsObject = [];
    //     var chores_done_hbsObject = [];
    //     var chores_all = []
    //     db.Chores.findAll({
    //         order: [['createdAt', 'DESC']],
    //         where: {
    //             username: req.params.username,
    //             chore_state: false
    //         }
    //     }).then(function (data) {
    //         for (var i = 0; i < data.length; i++) {
    //             chores_todo_hbsObject.push(data[i]);
    //         }
    //         chores_all.push(chores_todo_hbsObject);
    //     });
    //     db.Chores.findAll({
    //         order: [['createdAt', 'DESC']],
    //         where: {
    //             username: req.params.username,
    //             chore_state: true
    //         }
    //     }).then(function (data) {
    //         for (var i = 0; i < data.length; i++) {
    //             chores_done_hbsObject.push(data[i]);
    //         }
    //         chores_all.push(chores_done_hbsObject);
    //         res.json(chores_all);
    //     });
    // });
