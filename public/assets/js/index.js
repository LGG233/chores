$(document).ready(function () {
    $('#new-chore-btn').click(function () {
        event.preventDefault();
        $('#new-chore-modal').modal('show');
    });

    $('#edit-chore-btn').click(function () {
        event.preventDefault();
        $('#edit-chore-modal').modal('show');
    });

    // add chore to db //
    $("#submitNewChore").on("click", function () {
        event.preventDefault();
        var data = {
            username: $("#inputUserName").val().trim(),
            chore: $("#inputChore").val().trim(),
            overview: $("#inputDescription").val().trim(),
            due_date: $("#inputDate").val().trim()
        };
        api.newChore(JSON.stringify(data));
        window.location = 'localhost:8080';
        $('#new-chore-modal').modal('hide');
        document.location.reload = 'localhost:8080';
    });

    // change status of a chore to done / todo //
    $(".change-status").on("click", function (event) {
        var chore_id = $(this).data("id");
        var chore_state = $(this).data("chorestate");
        if (chore_state != 0) {
            new_chore_state = 0;
        } else {
            new_chore_state = 1;
        }
        var newChore_State = { chore_state: new_chore_state };
        $.ajax({
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            url: "api/choreStatus/" + chore_id,
            type: "PUT",
            data: newChore_State
        }).then(function (result) {
            location.reload();
        })
    });

    // delete a chore // 
    $(".delete-chore").on("click", function (event) {
        var chore_id = $(this).data("id");
        var result = confirm("Want to delete chore # " + chore_id + "?");
        if (result) {
            $.ajax({
                url: "api/choreDelete/" + chore_id,
                type: "DELETE"
            }).then(function (response) {
                console.log(response);
                location.reload();
            })
        };
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
});













