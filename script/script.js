$(document).ready(function () {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const users = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : [];

    function validateInput(input) {
        const inputId = input.attr('id');
        const pError = $('#' + inputId + ' + p');

        if (input.val() === "") {
            showError(pError, input, "Field is required");
            return false;
        }

        const inputName = input.attr('name');
        const inputValue = input.val();

        switch (inputName) {
            case "firstName":
            case "lastName":
                if (!nameRegex.test(inputValue)) {
                    showError(pError, input, "Enter characters only");
                    return false;
                }
                break;
            case "email":
                if (!emailRegex.test(inputValue)) {
                    showError(pError, input, "Enter a valid email format");
                    return false;
                }
                break;
            case "password":
                if (inputValue.length < 9) {
                    showError(pError, input, "Password should be more than 9 characters");
                    return false;
                }
                break;
            case "re-password":
                const pass = $("#3").val();
                if (pass !== inputValue) {
                    showError(pError, input, "Passwords don't match");
                    return false;
                }
                break;
        }

        clearError(pError, input);

        return true;
    }

    $('.myInput ,.SignUp-Input').blur(function () {
        validateInput($(this));
    });

    function showError(pError, input, message) {
        pError.text(message).show();
        input.css("border", "1px solid red");
        input.addClass('shake');
        setTimeout(function () {
            input.removeClass('shake');
        }, 500);;
    }

    function clearError(pError, input) {
        pError.hide();
        input.css("border", "none");
    }


    function saveData() {
        const obj = {};
        let email = "";
        $('.SignUp-Input').each(function () {
            const inputName = $(this).attr('name');
            const inputValue = $(this).val();
            obj[inputName] = inputValue;
            if (inputName === "email") {
                email = inputValue;
            }
        });

        const exists = users.some(user => user.email === email);

        if (exists) {
            $("#4 + p").text("Email already exist try to sigIn").show();
        } else {
            users.push(obj);
            localStorage.setItem('formData', JSON.stringify(users));
            // alert("Form submitted successfully");
            $('input').val('');
            location.replace("../quiz.html");
        }
    }


    function userExist(email, password) {
        return users.some(user => user.email === email && user.password === password);
    }

    $('#signUp').submit(function (e) {
        e.preventDefault();
        let valid = true;
        $('.SignUp-Input').each(function () {
            if (!validateInput($(this))) {
                valid = false;
            }
        });

        if (valid) {
            saveData();
        }
    });

    $('#signIn').submit(function (e) {
        e.preventDefault();
        let valid = true;
        let email = "";
        let password = "";

        $('.myInput').each(function () {
            if (!validateInput($(this))) {
                valid = false;
            }

            if ($(this).attr('name') === "email") {
                email = $(this).val();
            } else if ($(this).attr('name') === "password") {
                password = $(this).val();
            }
        });

        if (valid && !userExist(email, password)) {
            valid = false;
            showError($("#6 + p"), $("#6"), "invalid email or passward")
        }

        if (valid) {
            clearError($("#6 + p"), $("#6"))
            // alert("Form submitted successfully");
            $('input').val('');
            location.replace("../quiz.html");
        }
    });

    $('.signIn').click(function () {
        const signUp = $("#signUp");
        const signIn = $("#signIn");


        setTimeout(function () {
            signUp.css("display", "none");
            signIn.css("display", "block");
            $("#signIn-Img img").attr("src", "./images/signIn.svg");
            $(".signIn-out").css("transform", "rotateY(0deg)").addClass("signin");
        }, 100);
    });
});
