const userEmail = localStorage.getItem('currentUserEmail') ? localStorage.getItem('currentUserEmail') : "";

const users = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : [];

var firstName="" ,lastName="";

users.map(user => {
    if(user.email===userEmail){
      firstName = user.firstName;
      lastName = user.lastName;
    }
    
});
$("#userName").text(`sorry ${firstName} ${lastName} timeout!!`);