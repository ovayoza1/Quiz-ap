const quest = document.getElementById("question");
const ans = document.getElementById("answer");
  
function submit() {
var que =quest.value;
var answ =ans.value;
var array = answ.split(" ");
console.log(`Question: ${que} \n Answers: ${array}`);
  }