let qEle = document.querySelector('.ques')
let ansEle = document.querySelectorAll('.choices .choice')
let next = document.querySelector('#next')
let prev = document.querySelector('#prev')
let submit = document.querySelector('#submit')
let mark = document.querySelector('#mark')
let ques = document.querySelector('.right')
let count = document.querySelectorAll('.count span')[0]
let noOfQues = document.querySelectorAll('.count span')[1]
let progress = document.querySelector('progress')

let time = 0
let rand
let correct
let qaObj
let grade = 0
let current = 0
count.innerHTML = current + 1

class QA {
  constructor(q, arrAnswers, correct) {
    this.ques = q
    this.arr = arrAnswers
    this.correctAns = correct
  }
}

let qaArr = [
  new QA('HTML is _____ language.', ['scripting', 'markup', 'programming', ' stylesheet'], 'markup'),
  new QA('The basic building blocks of HTML are called ______.', ['classes', 'elements', 'selectors', 'properties'], 'elements'),
  new QA('To link an external CSS file, we use the ______ tag.', ['link', 'style', 'href', 'class'], 'link'),
  new QA('CSS stands for ______.', ['Cascading Style Sheets', 'Cascaded Scripting System', 'Centered Style Statements', 'Compiled Styling Structure'], 'Cascading Style Sheets'),
  new QA('If statement evaluates a ____ and executes code based on it.', ['condition', 'expression', 'variable', 'function'], 'condition'),
  new QA('The _______ function displays a message in a pop-up window.', ['alert()', 'print()', 'message()', 'show()'], 'alert()'),
]

//TODO: Show time left
setInterval(function () {
  time++;
  progress.value = time;
  if(time == 100){
    location.replace("./timeoutPage.html")
  }
}, 1000)

//TODO: Shuffle questions
let shuffled = shuffle(qaArr)
function shuffle(arr) {
  let current = arr.length - 1,
    temp,
    random
  while (current > 0) {
    random = Math.floor(Math.random() * current)
    current--
    temp = arr[current]
    arr[current] = arr[random]
    arr[random] = temp
  }
  return arr
}

//TODO: to display questions and choices
let showQue = (i) => {
  checkBtns()
  rand = Math.floor(Math.random() * shuffled.length)
  qaObj = shuffled[i]
  console.log(qaObj)
  correct = shuffled[i].correctAns
  qEle.innerHTML = qaObj.ques
  ansEle.forEach((ele, j) => {
    ele.innerHTML = qaObj.arr[j]
  })
}
showQue(current)

//TODO: Previous button click event
next.addEventListener('click', () => {
  current++
  checkBtns()
  checkSelected()
  showQue(current)
  count.innerHTML = current + 1
})

//TODO: Previous button click event
prev.addEventListener('click', () => {
  current--
  checkBtns()
  checkSelected()
  showQue(current)
  count.innerHTML = current + 1
})

//TODO: if user clicked on any choice, push the answer in the array
let answers = []
ansEle.forEach((ele) => {
  ele.addEventListener('click', () => {
    answers[current] = ele.innerHTML
    checkSelected()
  })
})

//TODO: Mark button click event
let markedQues = []
mark.addEventListener('click', () => {
  if (!markedQues.includes(qaObj)) {
    markedQues.push(shuffled[current])
    let mQ = document.createElement('div')
    mQ.innerHTML = `Question ${markedQues.length}`
    mQ.id = markedQues.length - 1
    mQ.classList.add(current)
    ques.appendChild(mQ)
  }
})

//TODO: Marked questions click event
document.querySelector('.right').addEventListener('click', (e) => {
  if (e.target.id) {
    qEle.innerHTML = markedQues[e.target.id].ques
    current = e.target.classList[0]
    ansEle.forEach((ele, i) => {
      ele.innerHTML = markedQues[e.target.id].arr[i]
    })
    count.innerHTML = parseInt(current) + 1
    checkBtns()
    checkSelected()
  }
})

//TODO: Submit click event
submit.addEventListener('click', () => {
  shuffled.forEach((obj, i) => {
    if (obj.correctAns == answers[i]) {
      grade++
    }
  })
  localStorage.setItem("grade", grade);
  location.replace("./gradePage.html")
})

//TODO: Check whether to display prev, next and submit buttons or not
function checkBtns() {
  if (current == 0) {
    prev.style.display = 'none'
    next.style.display = 'inline-block'
    submit.style.display = 'none'
  } else if (current == shuffled.length - 1) {
    prev.style.display = 'inline-block'
    next.style.display = 'none'
    submit.style.display = 'inline-block'
  } else {
    prev.style.display = 'inline-block'
    next.style.display = 'inline-block'
    submit.style.display = 'none'
  }
}

//TODO: Check selected answer to change its color
function checkSelected() {
  ansEle.forEach((choice) => {
    console.log(answers)
    if (answers[current] != undefined) {
      if (choice.innerHTML === answers[current]) {
        console.log(choice.innerHTML)
        console.log(answers[current])
        ansEle.forEach((el) => {
          el.classList.remove('checked')
        })
        choice.classList.add('checked')
      }
    } else {
      ansEle.forEach((el) => {
        el.classList.remove('checked')
      })
    }
  })
}

//TODO: to display number of questions in span
noOfQues.innerHTML = shuffled.length
