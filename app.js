var firebaseConfig = {
  apiKey: "AIzaSyDyB7f--bxJt2MNI4OvdC9PabVh8A0Wjh8",
  authDomain: "quiz-app-94099.firebaseapp.com",
  databaseURL: "https://quiz-app-94099.firebaseio.com",
  projectId: "quiz-app-94099",
  storageBucket: "",
  messagingSenderId: "364881900888",
  appId: "1:364881900888:web:9948ad7e5fc69d27"
};

firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

const quizDoc = firestore.doc("sample/quiz1");

const outPutHeader = document.querySelector("#title");
const inputText1 = document.querySelector("#question");
const inputText2 = document.querySelector("#answer");
const saveButton = document.querySelector("#save");
const load = document.querySelector("#load");



let save = () => {
  const textToSave1 = inputText1.value;
  const textToSave2 = inputText2.value;


  console.log(textToSave1);
  console.log(textToSave2);

  quizDoc.set({
    question: textToSave1,
    answer: textToSave2

  }).then(() => {
    console.log("Status saved!");
  }).catch((error) => {
    console.log("Got an error", error);
  });
  inputText1.value = " "
  inputText2.value = " "
};

if (saveButton) {
  saveButton.addEventListener("click", save);
}


if (load) {
  load.addEventListener("click", function () {
    quizDoc.get().then(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        console.log(myData);
        
         console.log(myData.question);
        
        console.log(myData.answer);
        questions.innerText = "Status: " + myData.question + " Answer: " + myData.answer;

        console.log(doc.data().tim);

      }
    }).catch(function (error) {
      console.log("Got an error: ", error);
    });
  });
};

