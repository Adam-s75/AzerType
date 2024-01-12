const story1 =
  "Une grenouille vivait au bord d'un trou rempli d'eau, près d'un ruisseau. C'était une petite grenouille verte, discrète, ordinaire. Elle avait envie de devenir extraordinaire et réfléchissait au moyen de se faire remarquer. A force d'y penser, elle eut une idée. Elle se mit à boire l'eau de son trou, à boire, à boire, et elle la but jusqu'à la dernière goutte ! Et elle commença à grossir. Ensuite elle se mit à boire l'eau du ruisseau, à boire, à boire, et elle la but jusqu'à la dernière goutte ! Et elle grossissait de plus en plus. En suivant le lit du ruisseau, elle arriva à la rivière, et elle se mit à boire l'eau de la rivière, à boire, à boire, et elle la but jusqu'à la dernière goutte ! Et comme la rivière se jetait dans le fleuve, elle alla près du fleuve, et elle se mit à boire l'eau du fleuve, à boire, à boire, et elle la but jusqu'à la dernière goutte ! Et la grenouille gonflait, gonflait !";
const story2 = `Diabolo est un petit poney tout noir. Il est né et a grandi dans un immense pré vert, avec sa maman et d'autres poneys. Chaque semaine, une personne venait s'occuper d'eux. Elle remplissait l'abreuvoir et mettait du foin en hiver, avant de repartir. Diabolo était de nature timide et ne s'approchait pas trop. Il était heureux avec ses amis et pensait que tout resterait ainsi.
Jusqu'à un jour spécial, où sa vie a basculé.`;
const story3 = `Il était une fois un pauvre escargot qui souffrait beaucoup à chaque fois qu'il partait en randonnée, car il avait du mal à suivre le rythme de ses compagnons.
La coccinelle était aussi rapide qu'une souris, le mille-pattes, avec ses mille pattes, ignorait la fatigue, le scarabée prenait même le temps de faire des escapades vers les fleurs.
Le pauvre petit escargot, lui, peinait, soufflait, transpirait tout seul et loin derrière, abandonné par les autres qui n'avaient plus la patience de l'attendre.
Quand le petit escargot parvenait enfin à rejoindre le groupe, les autres petites bêtes s'étaient déjà bien reposées, avaient bien mangé et après avoir bien joué, avaient préparé le campement et dormaient depuis bien longtemps. Et comme il n'y avait plus de place, le petit escargot devait coucher à la belle étoile.
Mais chaque matin, obstiné, il reprenait la route, espérant toujours rattraper ses amis. Pour ne pas s'ennuyer pendant le parcours, il sifflotait, regardait à droite et à gauche, saluait les petites bêtes qu'il rencontrait.`;
//Création d'un nombre qui sélectionne l'histoire
let story = null;
let start = false;
let currentIndex = 0;
let timepassed = 0;

function chooseStory() {
  storyNumber = Math.trunc(Math.random() * 3 + 1);
  console.log(storyNumber);
  if (storyNumber === 1) {
    story = story1;
  } else if (storyNumber === 2) {
    story = story2;
  } else {
    story = story3;
  }
}

chooseStory();

//DOM SELECTOR
const timer = document.querySelector(".timeSet");
const buttonStart = document.querySelector(".buttonStart");
const NewGame = document.querySelector(".NewGame");
const blur = document.querySelector(".blur");
const prompter = document.querySelector(".prompt");

//Caractère pris en compte
const allowedKeys =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ éçùèà'\"':,.!?";

let words = story.split(" ");
let splitted = story.split("");

function displayOne() {
  let numberLetter = 0;

  //------------------------------------------------CREER Div Mot
  for (let i = 0; i < words.length; i++) {
    let currentWordQuery = document.querySelector(`.word${i}`);
    let currentWord = words[i].split("");
    let wordLong = currentWord.length;

    //---------------------------------------------------- Création Div Lettre

    for (let j = 0; j < splitted.length; j++) {
      if (splitted[numberLetter] !== " ") {
        let divWord = document.createElement("div"); //Créer une div stocker dans divWord
        divWord.classList.add(`letter${numberLetter}`); //J'y ajouter une class avec un numéro
        divWord.classList.add(`letter`); //deuxième class pour le CSS
        currentWordQuery.appendChild(divWord); //je la met dans le mot actuel
        let currentWord = document.querySelector(`.letter${numberLetter}`); //QuerySelector des nouvelles DIV letter
        let preWord = document.createElement("pre"); //Creation element pre pour les caractères
        currentWord.appendChild(preWord); //que je glisse dedans
        preWord.textContent = splitted[numberLetter]; //j'y ajoute la lettre selon l'index du tableau splitted
        numberLetter++;
      } else {
        let htmlSpace = `<div class= "letter${numberLetter} letter"><pre> </pre></div>`; //Méthode insertAdjacent pour pouvoir insérer où je veux
        currentWordQuery.insertAdjacentHTML("afterend", htmlSpace);
        numberLetter++;
      }
      if (j >= wordLong) {
        break;
      }
    }
  }
}

function displayWords() {
  words.forEach((word, i) => {
    let htmlDiv = `<div class="word${i} word"></div>`;
    prompter.insertAdjacentHTML("beforeend", htmlDiv);
  });
}

//afficher le jeu :
function displayGame() {
  document.addEventListener("DOMContentLoaded", function () {
    displayWords();
    displayOne();
  });
}
displayGame();
//CREATION DE DIV

document.addEventListener("DOMContentLoaded", function () {
  // function Initialisation () {
  let currentPrecision = document.querySelector(".accuracy");
  let currentLetter = document.querySelector(`.letter${currentIndex}`);
  let goodLetter = 0;
  let wrongLetter = 0;
  let precision = 100;

  document.addEventListener("keydown", (ev) => {
    if (currentIndex >= 1) {
      precision = ((1 - wrongLetter / currentIndex) * 100).toFixed(2);
      currentPrecision.textContent = `🎯${precision} %`;
    }
    currentLetter = document.querySelector(`.letter${currentIndex}`);
    let nextLetter = document.querySelector(`.letter${currentIndex + 1}`);
    let nbError = document.querySelector(`.error`);
    currentLetter.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    //MECANIQUE JEU

    if (allowedKeys.includes(ev.key)) {
      //affichage du score

      if (currentIndex < splitted.length && ev.key === splitted[currentIndex]) {
        currentLetter.classList.remove("current");
        currentLetter.classList.add("correct");
        nextLetter.classList.add("current");
        currentIndex += 1;
        goodLetter += 1;
        if (
          currentIndex === splitted.length &&
          !document.querySelector(".result")
        ) {
          DisplayScore();
        }
      } else if (
        currentIndex < splitted.length &&
        ev.key !== splitted[currentIndex]
      ) {
        currentIndex += 1;
        currentLetter.classList.add("false");
        currentLetter.classList.remove("current");
        prompter.classList.add("shake");
        nextLetter.classList.add("current");
        setTimeout(() => {
          prompter.classList.remove("shake");
        }, 250);
        wrongLetter += 1;
        nbError.textContent = `Error ❌ ${wrongLetter}`;
      }
    } else {
      ev.preventDefault();
    }
  });

  function DisplayScore() {
    document.querySelector(".prompt").style.display = "none";
    document.querySelector(".accuracy").style.display = "none";
    document.querySelector(".error").style.display = "none";
    timer.style.display = "none";
    const resultat = ((currentIndex - wrongLetter) / (timepassed / 60)).toFixed(
      2
    );

    let HTML = `<div class="result">
            <h2>Votre Résultat :</h2>
            <p>${resultat} caractère par minutes,
            avec une précision de ${precision} %</p>
            </div>`;
    document.querySelector(".container").insertAdjacentHTML("afterbegin", HTML);
  }

  const Minutes = 2;
  let time = Minutes * 60;

  //Gestion timer

  //afiche score à la fin de l'exercice
  let LaunchTimer;
  let LaunchTimerResult;
  //Faire démarrer le jeu :

  function startGame() {
    LaunchTimerResult = setTimeout(() => {
      if (displayed === false) {
        DisplayScore();
      }
    }, 120000);

    LaunchTimer = setInterval(() => {
      let minutes = parseInt(time / 60, 10);
      let secondes = parseInt(time % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      secondes = secondes < 10 ? "0" + secondes : secondes;

      timer.textContent = `${minutes}:${secondes}`;
      time = time <= 0 ? 0 : time - 1;
      timepassed += 1;
    }, 1000);
    currentLetter = document.querySelector(`.letter${currentIndex}`);
    currentLetter.classList.add("current");
  }

  NewGame.addEventListener("click", () => {
    if (document.querySelector(".result")) {
      document.querySelector(".result").remove();
      prompter.style.display = "flex";
    }
    precision = 100;
    wrongLetter = 0;
    goodLetter = 0;
    prompter.textContent = "";
    clearInterval(LaunchTimer);
    clearTimeout(LaunchTimerResult);
    blur.style.display = "flex";
    chooseStory();
    words = story.split(" ");
    splitted = story.split("");
    displayWords();
    displayOne();
    currentIndex = 0;
  });

  buttonStart.addEventListener("click", function () {
    time = Minutes * 60;
    blur.style.display = "none";
    document.querySelector(".accuracy").style.display = "block";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".accuracy").textContent = `🎯 ${precision}.00 %`;
    document.querySelector(".error").textContent = `Error ❌ ${wrongLetter}`;

    startGame();
  });
});
