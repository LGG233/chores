// import { json } from "sequelize/types";

$(document).ready(function () {

    $('#new-chore-btn').click(function () {
        event.preventDefault();
        $('#new-chore-modal').modal('show');
    });

    $('#edit-chore-btn').click(function () {
        event.preventDefault();
        $('#edit-chore-modal').modal('show');
    });

    $("#submitNewChore").on("click", function () {
        event.preventDefault();
        var data = {
            username: $("#inputUserName").val().trim(),
            chore: $("#inputChore").val().trim(),
            overview: $("#inputDescription").val().trim(),
            due_date: $("#inputDate").val().trim()
        };
        console.log(data);
        api.newChore(JSON.stringify(data));
        console.log("chore successfully created");
        window.location = 'localhost:8080';
        $('#new-chore-modal').modal('hide');
        document.location.reload = 'localhost:8080';

    });

    $(".change-status").on("click", function (event) {
        var chore_id = $(this).data("id");
        var chore_state = $(this).data("chorestate");
        console.log(chore_id);
        console.log(chore_state);
        
        if (chore_state != 0) {
            new_chore_state = 0;
            console.log("should be false " + new_chore_state);
        } else {
            new_chore_state = 1;
            console.log("Should be true " + new_chore_state);
        }
        console.log(new_chore_state);
        var newChore_State = {
            chore_state: new_chore_state
        };
        console.log("here's the chore_id again: " + chore_id);
        $.ajax({
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            url: "api/choreStatus/" + chore_id,
            type: "PUT",
            data: newChore_State
        })
        // api.newChoreStatus(JSON.stringify(newChore_State, chore_id));
        console.log(newChore_State);
        console.log("changed chore_state to", new_chore_state);
        // Reload the page to get the updated list
        // location.reload();

        // Send the PUT request.
    });


    var api = {
        newChore: function (data) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/newChore",
                type: "POST",
                data: data
            })
        },
        newChoreStatus: function (newChore_State, chore_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/choreStatus/" + chore_id,
                type: "PUT",
                data: newChore_State
            })
        },
        caloriePost: function (data, user_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/caloriePost/" + user_id,
                type: "POST",
                data: data
            })
        },
        activityPost: function (data, user_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/activityPost/" + user_id,
                type: "POST",
                data: data
            })
        },
        userweightPost: function (data, user_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/userweightPost/" + user_id,
                type: "POST",
                data: data
            })
        },
        activitiesGet: function (user_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/activitiesGet/" + user_id,
                type: "GET"
            })
        },
        caloriesGet: function (user_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/caloriesGet/" + user_id,
                type: "GET",
            })
        },
        userweightGet: function (user_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/userweightGet/" + user_id,
                type: "GET"
            })
        },
        userdataGet: function (user_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/userdataGet/" + user_id,
                type: "GET"
            })
        },
        userGet: function () {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/userGet",
                type: "GET"
            })
        }
    };




    // $(function () {

    //     $("#newusermodalbtn").on("click", function () {
    //         event.preventDefault();
    //         var data = {
    //             username: $("#inputNewUserName").val().trim(),
    //             password: $("#inputNewPassword").val().trim(),
    //             starting_weight: $("#inputCurrentWeight").val().trim(),
    //             target_weight: $("#inputTargetWeight").val().trim()
    //         };
    //         console.log(data);
    //         api.userCreation(JSON.stringify(data));
    //         console.log("user successfully created");
    //         window.location = 'https://fit-or-fatapp.herokuapp.com/input';
    //     });


    //     //////// sign in button listener /////////////


    //     $("#sign-in-btn").on("click", function () {
    //         event.preventDefault();
    //         $("#sign-in-modal").modal("show");
    //         console.log("sign in button clicked/validated");
    //     });

    //     ////////////// food submit listener /////////////

    //     $("#food-submit").click(function () {
    //         var foodName = {
    //             name: $("#food-input").val().trim(),
    //         };
    //         foodName.replace(" ", "%20");
    //         var queryURL = "'https://api.edamam.com/api/food-database/parser?ingr=" + foodName + "&app_id={2cea8c5e}&app_key={3742da7bb611e71fab3e49e361fdbb55}"

    //         $.ajax({
    //             url: queryURL,
    //             method: "POST"
    //         }).then(function (response) {
    //             total_cal_con = { total_cal_con: response.hints[0].food.nutrients.ENERC_KCAL };
    //             food_name = { food_name: response.hints[0].food.label };
    //             var data = { total_cal_con, food_name };
    //             api.caloriePost(JSON.stringify(data));
    //             console.log("food submitted!");
    //         });
    //     });

    //     ////////////// activity submit listener //////////////

    //     $("#activity-submit").click(function () {
    //         var activity_name = { activity_name: $("#activity-type-input").val().trim() };
    //         var activity_quantity = { activity_quantity: $("#activity-amt-input").val().trim() };
    //         var activity_date = {activity_date: Date().getTime()};
    //         var total_cal_burn = {total_cal_burn: ($("#activity-amt-input").val().trim() * 150 )};
    //         var data = { activity_name, activity_quantity, activity_date, total_cal_burn };
    //         api.activityPost(JSON.stringify(data));
    //         console.log("activity submitted!");
    //     });

    //     /////////////////// weight submit listener //////////////////

    //     $("#weight-submit").click(function () {
    //         var user_weight = $("#weight-input").val().trim();
    //         api.userweightPost(JSON.stringify(user_weight));
    //         window.location = "https://fit-or-fatapp.herokuapp.com/charts";

    //     });

    // });
});













