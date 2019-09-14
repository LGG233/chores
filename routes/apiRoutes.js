var db = require("../models");
var bcrypt = require("bcrypt");
const saltRounds = 10;


module.exports = function (app) {
    // gets landing page //
    app.get('/home', function (req, res, next) {
        res.render('home', { title: 'Welcome' });
    });

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


    ////////// POST ///////////

    // new user api post
    app.post("/api/newUser", function (req, res) {
        db.Users.count({ where: { username: req.body.username } })
            .then(result => {
                console.log(result)
                if (result > 0) {
                    console.log('Duplicate username. Please log in or try again.');
                    res.render("error", { title: 'Duplicate username. Please log in or try again.' });
                    return
                } else if (req.body.username === "") {
                    console.log('Username cannot be blank. Please try again.');
                    res.render('error', { title: 'Username is required.' });
                    return
                } else if (req.body.email === "") {
                    console.log('Email cannot be blank. Please try again.');
                    res.render('error', { title: 'Email is required.' });
                    return
                } else if (req.body.password.length < 8) {
                    console.log('Password too short. Please try again with a password of at least eight characters.');
                    res.render('error', { title: 'Password too short. Please try again.' });
                    return
                } else if (req.body.password != req.body.passwordMatch) {
                    console.log('Passwords do not match. Please try again.');
                    console.log(req.body.password);
                    console.log(req.body.passwordMatch);
                    res.render('error', { title: 'Passwords do not match. Please try again.' });
                    return
                } else {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        db.Users.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                        }).then(function (results) {
                            console.log(results.dataValues.username);
                        });
                    })
                };
            });
    });

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

    ////////// PUT ///////////

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

    ////////// DELETE ///////////

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