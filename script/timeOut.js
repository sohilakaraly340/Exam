$(document).ready(function () {
    const userEmail = localStorage.getItem('currentUserEmail') || "";
    const users = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : [];

    let firstName = "", lastName = "";

    users.forEach(user => {
        if (user.email === userEmail) {
            firstName = user.firstName;
            lastName = user.lastName;
        }
    });

    $("#userName").text(`Sorry ${firstName} ${lastName}, timeout!!`);
    $(".cont").slideDown(1200);
});
