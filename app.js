var mainArray = [];
allQuestionsBtn = document.getElementById("showQuestions")



var firebaseConfig = {
  apiKey: "AIzaSyDyB7f--bxJt2MNI4OvdC9PabVh8A0Wjh8",
  authDomain: "quiz-app-94099.firebaseapp.com",
  databaseURL: "https://quiz-app-94099.firebaseio.com",
  projectId: "quiz-app-94099",
  storageBucket: "quiz-app-94099.appspot.com",
  messagingSenderId: "364881900888",
  appId: "1:364881900888:web:9948ad7e5fc69d27"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const quizDoc = firestore.collection("sample");
let id = " ";
const outPutHeader = document.querySelector("#title");
const inputText1 = document.querySelector("#question");
const inputText2 = document.querySelector("#answer");
const saveButton = document.querySelector("#save");
const load = document.querySelector("#load");


//........save..........located at adminPage.html
let save = () => {
  const textToSave1 = inputText1.value;
  const textToSave2 = inputText2.value;
  console.log(textToSave1);
  console.log(textToSave2);

  quizDoc.add({
    question: textToSave1,
    answer: textToSave2
  })

    .then(() => {
      console.log("Status saved!");
      window.location.href = "editQuestion.html";
    })

    .catch((error) => {
      console.log("Got an error", error);
    });

  inputText1.value = " "
  inputText2.value = " "
};

if (saveButton) {
  saveButton.addEventListener("click", save);
}


//------------load------------
if (load) {
  load.addEventListener("click", function () {
    quizDoc.get()
      .then((doc) => {
        if (doc && doc.exists) {
          const myData = doc.data();
          console.log(myData);
          console.log(myData.question);
          console.log(myData.answer);
          load.innerText = "Status: " + myData.question + " Answer: " + myData.answer;
          // console.log(doc.data().tim);
          // window.location.href = "editQuestion.html";

        }
      }).catch((error) => {
        console.log("Got an error: ", error);
      });
  });
};

const list = document.querySelector('#list');//located at editQuestion.html


let renderQuestions = (doc) => {
  let div = document.createElement('div');
  let question = document.createElement('span');
  let answer = document.createElement('span');
  let edit = document.createElement('i');
  let deleteIcon = document.createElement('i');
  let icons = document.createElement('div')
  let queAnsDiv = document.createElement('div')

  //------------classes-----------
  queAnsDiv.classList.add('questionAns')
  div.classList.add('mainDiv');
  edit.classList.add('far');
  edit.classList.add('fa-edit');
  deleteIcon.classList.add('fas');
  deleteIcon.classList.add('fa-trash');


  div.setAttribute('data-id', doc.id);
  question.textContent = doc.data().question;
  answer.textContent = doc.data().answer;


  queAnsDiv.appendChild(question);
  queAnsDiv.appendChild(answer);
  div.appendChild(queAnsDiv);

  icons.appendChild(edit);
  icons.appendChild(deleteIcon);

  div.appendChild(icons);

  list.appendChild(div);

  //deleting data
  if (deleteIcon) {
    deleteIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
      firestore.collection('sample').doc(id).delete();
    });
  }

  //editing data
  edit.addEventListener('click', (e) => {
    e.stopPropagation();
    id = e.target.parentElement.parentElement.getAttribute('data-id');
    localStorage.setItem('id', id);
    console.log(id);
    window.location.href = "test.html";

  });
}

//getting data
if (list) {
  firestore.collection('sample')
    .get()
    .then((quizDoc) => {
      quizDoc.docs.forEach(doc => {
        mainArray.push(doc);

        renderQuestions(doc);
      });
    });
}
//show id located at test.html
let showMe = () => {
  id = localStorage.getItem('id');
  console.log(id);
  firestore.collection('sample').doc(id)
    .get()
    .then((doc) => {
      if (doc && doc.exists) {
        const myData = doc.data();
        console.log(myData.question);
        que.value = myData.question;
        ans.value = myData.answer;
      };
    })
}

//-----------updating data---------located at new.html
const text1 = document.getElementById('input1');
const text2 = document.getElementById('input2');
const showBtn = document.getElementById('showBtn');

let showValues = () => {
  let val1 = input1.value;
  let val2 = input2.value;
  let id = localStorage.getItem('id');
  console.log(id);
  console.log(`Field-1: ${val1}, Field-2: ${val2}`);


  firestore.collection('sample').doc(id).update({
    question: val1,
    answer: val2
  })

    .then(() => {
      console.log("Updated Successfully");
      window.location.href = "editQuestion.html";

    })
    .catch(err => console.log(err));
}
if (showBtn) {
  showBtn.addEventListener('click', showValues);
}




firestore.collection('sample')
  .get()
  .then((quizDoc) => {
    quizDoc.docs.forEach(doc => {
      mainArray.push({
        question:doc.data().question,
        answer:doc.data().answer
      });

    });
  });

let showAllQuestions = () => {
  mainArray.forEach(question=>{
    console.log(`Question: ${question.question}`);
    console.log(`Answer: ${question.answer}`);
    
  })

}

allQuestionsBtn.addEventListener('click', showAllQuestions)
