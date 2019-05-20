var db = require("../models");

module.exports = function (app) {

    // gets list of users //
    app.get("/", function (req, res) {
        db.Users.findAll({}).then(function (dbUsers) {
            res.json(dbUsers);
        })
    })

    app.get("/api/userGet", function (req, res) {
        db.Users.findAll({}).then(function (dbUsers) {
            res.json(dbUsers);
        })
    })

    app.get("/api/choresGet", function (req, res) {
        db.Chores.findAll({}).then(function (dbChores) {
            var hbsObject = {
                Chores: dbChores
              };
        res.render("index", hbsObject);
    })
})

// gets list of all chores for user //
app.get("/api/choresGet/:username", function (req, res) {
    db.Chores.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            username: req.params.username,
        }
    }).then(function (dbChores) {
        res.render("index", dbChores);
    });
});

// // gets list of uncompleted chores for user //
// app.get("/api/choresTodoGet/:username", function (req, res) {
//     db.Chores.findAll({
//         order: [['createdAt', 'DESC']],
//         where: {
//             username: req.params.username,
//             chore_state: false
//         }
//     }).then(function (dbChores) {
//         res.json(dbChores);
//     });
// });

// // gets list of completed chores for user //
// app.get("/api/choresDoneGet/:username", function (req, res) {
//     db.Chores.findAll({
//         order: [['createdAt', 'DESC']],
//         where: {
//             username: req.params.username,
//             chore_state: true
//         }
//     }).then(function (dbChores) {
//         res.json(dbChores);
//     });
// });

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