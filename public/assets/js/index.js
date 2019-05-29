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
        var newChore = {
            username: $("#inputUserName").val().trim(),
            chore: $("#inputChore").val().trim(),
            overview: $("#inputDescription").val().trim(),
            due_date: $("#inputDate").val().trim()
        };
        console.log(newChore);
        // $.ajax({
        //     headers: { "Content-type": "application/json" },
        //     url: "api/newChore",
        //     type: "POST",
        //     data: newChore
        api.newChore(JSON.stringify(newChore));
        // }).then(function (response) {
        // location.reload();
        $('#new-chore-modal').modal('hide');
        // location.reload();
    });

    // get data for editing chore //
    $(".edit-chore").on("click", function () {
        event.preventDefault();
        var chore_id = $(this).data("id");
        $.ajax({
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            url: "api/getChore/" + chore_id,
            dataType: "json",
            type: "GET",
        }).then(function (result) {
            console.log(result);
            var username = result[0].username;
            var chore = result[0].chore;
            var overview = result[0].overview;
            var due_date = result[0].due_date;
            var chore_id = result[0].chore_id;
            $('#edit-chore-modal').modal('show')
            $("#edit-chore-modal #inputEditedUserName").val(username);
            $("#edit-chore-modal #inputEditedChore").val(chore);
            $("#edit-chore-modal #inputEditedDescription").val(overview);
            $("#edit-chore-modal #inputEditedDate").val(due_date);
            $("#edit-chore-modal #choreID").val(chore_id);
        });
    });

    // send edited chore to db //
    $("#submitEditedChore").on("click", function () {
        event.preventDefault();
        var data = {
            username: $("#inputEditedUserName").val().trim(),
            chore: $("#inputEditedChore").val().trim(),
            overview: $("#inputEditedDescription").val().trim(),
            due_date: $("#inputEditedDate").val().trim()
        };
        var chore_id = $("#choreID").val().trim();
        console.log(data);
        console.log(chore_id);
        $('#edit-chore-modal').modal('hide')
        console.log("modal hidden");
        $.ajax({
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            url: "api/choreEdits/" + chore_id,
            type: "PUT",
            data: data
        }).then(function (result) {
            location.reload();
        })
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
        newChore: function (newChore) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/newChore",
                type: "POST",
                data: newChore
            }).then(function (response) {
                location.reload();
            })
        },
        getChore: function (chore_id) {
            return $.ajax({
                headers: { "Content-type": "application/json" },
                url: "api/getChore/" + chore_id,
                type: "GET"
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













