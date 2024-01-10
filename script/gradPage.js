let result = $(".result");
let msgEle = $("p");
let img = $("img");

let userEmail = localStorage.getItem('currentUserEmail') || "";
let users = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : [];

let firstName = "", lastName = "";

users.forEach(user => {
    if (user.email === userEmail) {
        firstName = user.firstName;
        lastName = user.lastName;
    }
});

result.html(`Your grade is <span>${localStorage.getItem("grade")}<span> %`);

if (localStorage.getItem("grade") < 50) {
    msgEle.html(`Sorry ${firstName} ${lastName}, you Failed in this quiz`);
    $(".result span").css("color","red")
    img.attr("src", "./images/fail.svg");
} else if (localStorage.getItem("grade") < 70) {
    msgEle.html(`Try again  ${firstName} ${lastName}, you can do it`);
} else {
    msgEle.html(`Congratulations ${firstName} ${lastName}!!`);
}
