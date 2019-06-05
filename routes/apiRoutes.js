var db = require("../models");

module.exports = function (app) {
    // gets list of all chores for all users  //
    app.get("/", function (req, res) {
        db.Chores.findAll({
            order: [['due_date']],
        }).then(function (dbChores) {
            var hbsObject = {
                Chores: dbChores
            };
            console.log(dbChores);
            console.log(hbsObject);
            res.render("index", hbsObject);
        })
    })
    // get list of specific user's chores 
    app.get("/chores/:username", function (req, res) {
        db.Chores.findAll({
            order: [['due_date']],
            where: {
                username: req.params.username,
            }
        }).then(function (dbChores) {
            var hbsObject = {
                Chores: dbChores
            };
            res.render("index", hbsObject);
            // res.json(hbsObject);
            // res.status(status).send(body)

            // console.log(dbChores);
            // console.log(hbsObject);
            // res.json(userChores);
            // console.log("next I'm going to re-render the handlebars document")
            // ("index").reload(hbsObject);
            // console.log(dbChores[0].chore)
            // console.log("I DID re-render the main document")
        });
    })
    
    app.get("/api/getChore/:chore_id", function (req, res) {
        db.Chores.findAll(
            {
                where: { chore_id: req.params.chore_id }
            })
            .then(function (choreToEdit) {
                res.json(choreToEdit);
            });
    })

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