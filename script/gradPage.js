let result = document.querySelector(".result");
let msgEle = document.querySelector("p");
let img = document.querySelector("img")

result.innerHTML = `Your grade is ${localStorage.getItem("grade")} %`

if(localStorage.getItem("grade") < 50){
    msgEle.innerHTML = `Sorry , you Failed in this quiz `
    img.src="./images/fail.svg"
}else if(localStorage.getItem("grade") < 70){
    msgEle.innerHTML = "Try again you can do it"
}else{
    msgEle.innerHTML = "Congratulations!!"
}