var db = require("../models");
var bcrypt = require("bcrypt");
const saltRounds = 10;
var passport = require("passport");


module.exports = function (app) {
    // gets landing page //
    app.get('/landing', function (req, res, next) {
        console.log("on '/' " + req.user);
        console.log("on '/' " + req.isAuthenticated());
        res.render('landing', { title: 'Welcome' });
    });

    // gets home page if logged in //
    app.get('/', authenticationMiddleware(), function (req, res, next) {
        console.log("on '/' " + req.user);
        console.log("on '/' " + req.isAuthenticated());
        res.redirect('/home');
    });

    // gets main page//
    app.get('/home', authenticationMiddleware(), function (req, res) {
        console.log("on 'home' " + req.user);
        console.log("on 'home' " + req.isAuthenticated());
        db.Chores.findAll({
            order: [['due_date']]
        }).then(function (dbChores) {
            var hbsObject = {
                Chores: dbChores
            };
            res.render('home', hbsObject);
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
            res.render("home", hbsObject);
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
            res.render("home", hbsObject);
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
                    res.render('error', { title: 'Passwords do not match. Please try again.' });
                    return
                } else {
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        db.Users.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                        }).then(function (results) {
                            const user_id = results.dataValues.user_id;
                            console.log(user_id);
                            req.login(user_id, function (err) {
                                res.redirect('/home')
                            })
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

passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});


function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.redirect('/landing')
    }
}