let qEle = $('.ques');
let ansEle = $('.choices .choice');
let next = $('#next');
let prev = $('#prev');
let submit = $('#submit');
let mark = $('#mark');
let ques = $('.right');
let count = $('.count span').eq(0);
let noOfQues = $('.count span').eq(1);
let progress = $('progress');

let time = 0 || sessionStorage.getItem("time");
let rand;
let correct;
let qaObj;
let grade = 0;
let current = (sessionStorage.getItem("current")) ? sessionStorage.getItem("current"):0;
count.html(+current + 1);

class Answer {
  constructor(arrAnswers, correct){
    this.arr = arrAnswers;
    this.correctAns = correct;
  }
}

class Question {
  constructor(q, arrAnswers, correct) {
    this.ques = q;
    this.answers = new Answer(arrAnswers, correct)
  }
}

let qaArr = [
  new Question('HTML is _____ language.', ['scripting', 'markup', 'programming', ' stylesheet'], 'markup'),
  new Question('The basic building blocks of HTML are called ______.', ['classes', 'selectors', 'properties', 'elements'], 'elements'),
  new Question('To link an external CSS file, we use the ______ tag.', ['style','href' , 'link', 'class'], 'link'),
  new Question('CSS stands for ______.', ['Cascading Style Sheets', 'Cascaded Scripting System', 'Centered Style Statements', 'Compiled Styling Structure'], 'Cascading Style Sheets'),
  new Question('If statement evaluates a ____ and executes code based on it.', ['expression', 'variable', 'condition', 'function'], 'condition'),
  new Question('The _______ function displays a message in a pop-up window.', ['print()', 'message()', 'show()', 'alert()'], 'alert()'),
];

//TODO: Show time left
setInterval(function () {
  time++;
  progress.val(time);
  sessionStorage.setItem("time", time);
  if (time == 100) {
    location.replace("./timeoutPage.html");
  }
}, 1000);

//TODO: Shuffle questions
let shuffled = shuffle(qaArr);
function shuffle(arr) {
  let curIndex = arr.length - 1,
    temp,
    random;
  while (curIndex > 0) {
    random = Math.floor(Math.random() * curIndex);
    curIndex--;
    temp = arr[curIndex];
    arr[curIndex] = arr[random];
    arr[random] = temp;
  }
  return arr;
}

//TODO: to display questions and choices
let showQue = (i) => {
  checkBtns();
  rand = Math.floor(Math.random() * shuffled.length);
  qaObj = shuffled[i];
  console.log(qaObj);
  correct = shuffled[i].answers.correctAns;
  qEle.html(qaObj.ques);
  ansEle.each((j, ele) => {
    $(ele).html(qaObj.answers.arr[j]);
  });
};
showQue(current);

//TODO: Next button click event
next.on('click', () => {
  current++;
  checkBtns();
  showQue(current);
  checkSelected(current);
  count.html(+current + 1);
});

//TODO: Previous button click event
prev.on('click', () => {
  current--;
  checkBtns();
  showQue(current);
  checkSelected(current);
  count.html(+current + 1);
});

//TODO: if user clicked on any choice, push the answer in the array
let answers = [];
ansEle.on('click', (ele) => {
  answers[current] = $(ele.target).html();
  checkSelected(current);
});

//TODO: Mark button click event
let markedQues = [];
let markedIndices = [];

mark.on('click', () => {
  if (!markedQues.includes(qaObj)) {
    markedQues.push(shuffled[current]);
    markedIndices.push(current);
    let mQ = $('<div>');
    mQ.html(`Question ${current+1} <i class="fa-solid fa-trash delete"></i>`);
    mQ.attr('id', markedQues.length - 1);
    mQ.attr("class", current);
    ques.append(mQ);
  }
});

//TODO: Marked questions click event
$('.right').on('click', (e) => {
  if ($(e.target).attr('id')) {
    qEle.html(markedQues[$(e.target).attr('id')].answers.ques);
    current = parseInt($(e.target).attr('class').split(' ')[0]);
    console.log(current)
    ansEle.each((i, ele) => {
      $(ele).html(markedQues[$(e.target).attr('id')].answers.arr[i]);
    });
    count.html(parseInt(current) + 1);
    checkBtns();
    checkSelected(current);
  }

  if($(e.target).hasClass("delete")){
    $(e.target).parent().remove();
  }
});

//TODO: Submit click event
submit.on('click', () => {
  shuffled.forEach((obj, i) => {
    if (obj.answers.correctAns == answers[i]) {
      grade++;
    }
  });
  let gradePer = (grade / shuffled.length) * 100;
  localStorage.setItem("grade", gradePer.toFixed(2));
  location.replace("./gradePage.html");
});

//TODO: Check whether to display prev, next and submit buttons or not
function checkBtns() {
  if (current == 0) {
    prev.css('display', 'none');
    next.css('display', 'inline-block');
    submit.css('display', 'none');
  } else if (current == shuffled.length - 1) {
    prev.css('display', 'inline-block');
    next.css('display', 'none');
    submit.css('display', 'inline-block');
  } else {
    prev.css('display', 'inline-block');
    next.css('display', 'inline-block');
    submit.css('display', 'none');
  }
}

//TODO: Check selected answer to change its background color
function checkSelected(i) {
  ansEle.each((index, choice) => {
    if (answers[i] != undefined) {
      if ($(choice).html() == answers[i]) {
        ansEle.removeClass('checked');
        $(choice).addClass('checked');
      }
    } else {
      ansEle.removeClass('checked');
    }
  });
}

//TODO: to display number of questions in span
noOfQues.html(shuffled.length);

//TODO: Store shuffled array, answers, current, and time in sessionStorage
$(window).on('beforeunload', function() {
  sessionStorage.setItem('shuffled', JSON.stringify(shuffled));
  sessionStorage.setItem('answers', JSON.stringify(answers));
  sessionStorage.setItem('markedQues', JSON.stringify(markedQues));
  sessionStorage.setItem('markedIndices', JSON.stringify(markedIndices));
  sessionStorage.setItem('current', current);
  sessionStorage.setItem('time', time);
});

//TODO: Restore data from sessionStorage if window reloaded
$(window).on('load', function() {
  let storedShuffled = sessionStorage.getItem('shuffled');
  if (storedShuffled) {
    shuffled = JSON.parse(storedShuffled);
    answers = JSON.parse(sessionStorage.getItem('answers'));
    markedQues = JSON.parse(sessionStorage.getItem('markedQues'));
    markedIndices = JSON.parse(sessionStorage.getItem('markedIndices'));
    current = parseInt(sessionStorage.getItem('current'));
    time = parseInt(sessionStorage.getItem('time'));
    progress.value = time;
    showQue(current); 
    checkSelected(current);

    let storedMarkedQues = JSON.parse(sessionStorage.getItem('markedQues'));
    if (storedMarkedQues) {
      markedQues = storedMarkedQues; 

      //TODO: Recreate the marked question elements
      for (let i = 0; i < markedQues.length; i++) {
        let mQ = $('<div>').html(`Question ${+markedIndices[i]+1} <i class="fa-solid fa-trash delete"></i>`);
        mQ.attr('id', i);
        mQ.attr("class", markedIndices[i]);
        ques.append(mQ);
      }
    }
  }
});

