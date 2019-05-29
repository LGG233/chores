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
    // get chore to be edited
    app.get("/api/getChore/:chore_id", function (req, res) {
        db.Chores.findAll(
            {
                where: { chore_id: req.params.chore_id }
            })
            .then(function (choreToEdit) {
                res.json(choreToEdit);
            });
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

    // new chore api post
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
                res.json(newStatus);
            });
    })

    // Edit chore //
    app.put("/api/choreEdits/:chore_id", function (req, res) {
        console.log(req.params.chore_id)
        console.log(req.body.username)
        console.log(req.body.chore)
        console.log(req.body.overview)
        console.log(req.body.due_date)
        db.Chores.update(
            {
                username: req.body.username,
                chore: req.body.chore,
                overview: req.body.overview,
                due_date: req.body.due_date
            },
            {
                where: { chore_id: req.params.chore_id }
            })
            .then(function (newStatus) {
                res.json(newStatus);
            });
    })

    // delete chore //
    app.delete("/api/choreDelete/:chore_id", function (req, res) {
        db.Chores.destroy(
            {
                where: { chore_id: req.params.chore_id }
            })
            .then(function (result) {
                if (result === 1) {
                    console.log("Chore deleted");
                }
                res.json(result);
            })
    });
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
