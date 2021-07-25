const api_url = "https://opentdb.com/api.php?amount=1";
document.getElementById("highscore").innerHTML = "Current High Score: " + "<strong>" + localStorage.getItem("highscore")+"</strong>";  

let points = 0;

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function shuffle(array) { //Fisher-Yates Shuffle
  var currentIndex = array.length,  randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function endgame(gameover){
  document.getElementById("answer_1").disabled = true;
  document.getElementById("answer_2").disabled = true;
  document.getElementById("answer_3").disabled = true;
  document.getElementById("answer_4").disabled = true;
  if (gameover=="Timesup"){
    document.getElementById("game").innerHTML = "<strong id='timesup'>Times up! Gameover.</strong>";
  }
  else if(gameover=="Incorrect"){
  if (document.getElementById("answer_1").textContent == correct_answer){
    document.getElementById("answer_1").style.background = "#00FF00";
    document.getElementById("answer_2").style.background = "#FF3633";
    document.getElementById("answer_3").style.background = "#FF3633";
    document.getElementById("answer_4").style.background = "#FF3633";
  }
  if (document.getElementById("answer_2").textContent == correct_answer){
    document.getElementById("answer_1").style.background = "#FF3633";
    document.getElementById("answer_2").style.background = "#00FF00";
    document.getElementById("answer_3").style.background = "#FF3633";
    document.getElementById("answer_4").style.background = "#FF3633";
  }
  if (document.getElementById("answer_3").textContent == correct_answer){
    document.getElementById("answer_1").style.background = "#FF3633";
    document.getElementById("answer_2").style.background = "#FF3633";
    document.getElementById("answer_3").style.background = "#00FF00";
    document.getElementById("answer_4").style.background = "#FF3633";
  }
  if (document.getElementById("answer_4").textContent == correct_answer){
    document.getElementById("answer_1").style.background = "#FF3633";
    document.getElementById("answer_2").style.background = "#FF3633";
    document.getElementById("answer_3").style.background = "#FF3633";
    document.getElementById("answer_4").style.background = "#00FF00";
  }
  document.getElementById("game").innerHTML = "<strong id='incorrect'>Incorrect. Gameover.</strong>";
  }
  document.getElementById("correctanswer").innerHTML = "Correct answer is:" + " " + "<strong>"+correct_answer+"</strong>";
  document.getElementById("points").innerHTML = "Your Score: " + "<strong>"+points+"</strong>";
  if (points > localStorage.getItem("highscore")){
    localStorage.setItem("highscore", points);
    document.getElementById("highscore").innerHTML = "*NEW* High Score: " + "<strong>" + localStorage.getItem("highscore")+"</strong>"; 
  }
  else if(localStorage.getItem("highscore") == null){
    localStorage.setItem("highscore", 0);
  }
  else{
    document.getElementById("highscore").innerHTML = "High Score: " + "<strong>" + localStorage.getItem("highscore")+"</strong>";  
  }
  document.getElementById("points").innerHTML = "Your Score: " + "<strong>"+points+"</strong>";
  document.getElementById("play").textContent = "Restart";
  document.getElementById("highscore").style.display = "initial";
  document.getElementById("play").style.display = "initial";
  points = 0;
}

function correct(){
  document.getElementById("answer_1").disabled = true;
  document.getElementById("answer_2").disabled = true;
  document.getElementById("answer_3").disabled = true;
  document.getElementById("answer_4").disabled = true;
  if (document.getElementById("answer_1").textContent == correct_answer){
    document.getElementById("answer_1").style.background = "#00FF00";
    document.getElementById("answer_2").style.background = "#FF3633";
    document.getElementById("answer_3").style.background = "#FF3633";
    document.getElementById("answer_4").style.background = "#FF3633";
  }
  if (document.getElementById("answer_2").textContent == correct_answer){
    document.getElementById("answer_1").style.background = "#FF3633";
    document.getElementById("answer_2").style.background = "#00FF00";
    document.getElementById("answer_3").style.background = "#FF3633";
    document.getElementById("answer_4").style.background = "#FF3633";
  }
  if (document.getElementById("answer_3").textContent == correct_answer){
    document.getElementById("answer_1").style.background = "#FF3633";
    document.getElementById("answer_2").style.background = "#FF3633";
    document.getElementById("answer_3").style.background = "#00FF00";
    document.getElementById("answer_4").style.background = "#FF3633";
  }
  if (document.getElementById("answer_4").textContent == correct_answer){
    document.getElementById("answer_1").style.background = "#FF3633";
    document.getElementById("answer_2").style.background = "#FF3633";
    document.getElementById("answer_3").style.background = "#FF3633";
    document.getElementById("answer_4").style.background = "#00FF00";
  }
  document.getElementById("game").innerHTML = "<strong id='correct'>Correct.</strong>";
  document.getElementById("correctanswer").innerHTML = "Correct answer is:" + " " + "<strong>"+correct_answer+"</strong>";
  document.getElementById("play").textContent = "Next Question";
  document.getElementById("play").style.display = "initial";
  points ++;
  document.getElementById("points").innerHTML = "Your Score: " + "<strong>"+points+"</strong>";
}

function reset(){
  document.getElementById("answer_1").disabled = false;
  document.getElementById("answer_2").disabled = false;
  document.getElementById("answer_3").disabled = false;
  document.getElementById("answer_4").disabled = false;
  document.getElementById("answer_1").style.background = "#00ADB5";
  document.getElementById("answer_2").style.background = "#00ADB5";
  document.getElementById("answer_3").style.background = "#00ADB5";
  document.getElementById("answer_4").style.background = "#00ADB5";
  document.getElementById("game").textContent = "";
  document.getElementById("correctanswer").textContent = "";
  document.getElementById("points").innerHTML = "Your Score: " + "<strong>"+points+"</strong>";
}

document.getElementById("play").onclick = async function play(){
  document.getElementById("header").style.display = "none";
  document.getElementById("author").style.display = "none";
  document.getElementById("desc").style.display = "none";
  reset();
  document.getElementById("play").style.display = "none";
  document.getElementById("highscore").style.display = "none";
  
  let possible_answers = [];
  const response = await fetch(api_url);
  const data = await response.json();
  const category_raw = data.results[0].category;
  const type_raw = data.results[0].type;
  const question_raw = data.results[0].question;
  const correct_answer_raw = data.results[0].correct_answer;
  const incorrect_answers_1_raw = data.results[0].incorrect_answers[0];
  const incorrect_answers_2_raw = data.results[0].incorrect_answers[1];
  const incorrect_answers_3_raw = data.results[0].incorrect_answers[2];
  
  category = decodeHtml(category_raw);
  question = decodeHtml(question_raw);
  correct_answer = decodeHtml(correct_answer_raw);
  incorrect_answer_1 = decodeHtml(incorrect_answers_1_raw);
  incorrect_answer_2 = decodeHtml(incorrect_answers_2_raw);
  incorrect_answer_3 = decodeHtml(incorrect_answers_3_raw);

  possible_answers.push(correct_answer);
  possible_answers.push(incorrect_answer_1);
  possible_answers.push(incorrect_answer_2);
  possible_answers.push(incorrect_answer_3);

  document.getElementById("question").innerHTML = "<strong>"+question+"</strong>";
  document.getElementById("answer_3").style.display = "none";
  document.getElementById("answer_4").style.display = "none";

  if (type_raw == "multiple"){
    shuffle(possible_answers);
    document.getElementById("answer_1").style.display = "initial";
    document.getElementById("answer_2").style.display = "initial";
    document.getElementById("answer_3").style.display = "initial";
    document.getElementById("answer_4").style.display = "initial";
    document.getElementById("answer_1").textContent = possible_answers[0];
    document.getElementById("answer_2").textContent = possible_answers[1];
    document.getElementById("answer_3").textContent = possible_answers[2];
    document.getElementById("answer_4").textContent = possible_answers[3];
  }
  else if(type_raw=="boolean"){
    document.getElementById("answer_1").style.display = "initial";
    document.getElementById("answer_2").style.display = "initial";
    document.getElementById("answer_1").textContent = "True";
    document.getElementById("answer_2").textContent = "False";
  }

  // Timer
  let count = 15, timer = setInterval(function() {
    document.getElementById("timer").innerHTML = "Time Remaining: <strong>" 
    +count-- + "s</strong>";
    if(count < 0){
      clearInterval(timer);
      endgame("Timesup");
    }
  }, 1000);

  document.getElementById("answer_1").onclick = function(){
    if (document.getElementById("answer_1").textContent == correct_answer){
      correct();
      clearInterval(timer);
    }
    else{
      endgame("Incorrect");
      clearInterval(timer);
    }
  }
  document.getElementById("answer_2").onclick = function(){
    if (document.getElementById("answer_2").textContent == correct_answer){
      correct();
      clearInterval(timer);
    }
    else{
      endgame("Incorrect");
      clearInterval(timer);
    }
  }
  document.getElementById("answer_3").onclick = function(){
    if (document.getElementById("answer_3").textContent == correct_answer){
      clearInterval(timer);
      correct();
      clearInterval(timer);
    }
    else{
      endgame("Incorrect");
      clearInterval(timer);
    }
  }
  document.getElementById("answer_4").onclick = function(){
    if (document.getElementById("answer_4").textContent == correct_answer){
      clearInterval(timer);
      correct();
      clearInterval(timer);
    }
    else{
      endgame("Incorrect");
      clearInterval(timer);
    }
  }
}

document.getElementById("answer_1").style.display = "none";
document.getElementById("answer_2").style.display = "none";
document.getElementById("answer_3").style.display = "none";
document.getElementById("answer_4").style.display = "none";
