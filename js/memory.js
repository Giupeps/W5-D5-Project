let arrayAnimali = [
  "🐱",
  "🦉",
  "🐾",
  "🦁",
  "🦋",
  "🐛",
  "🐝",
  "🐬",
  "🦊",
  "🐨",
  "🐰",
  "🐯",
  "🐱",
  "🦉",
  "🐾",
  "🦁",
  "🦋",
  "🐛",
  "🐝",
  "🐬",
  "🦊",
  "🐨",
  "🐯",
  "🐰",
];
//libreria per icone
//https://html-css-js.com/html/character-codes/

let arrayComparison = [];
let victoryArray = [];
let count = 0;

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

var interval;
let find = document.querySelector(".find");
let modal = document.querySelector("#modal");
let timer = document.querySelector(".timer");

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato
// (l'array contiene le icone degli animali)
function shuffle(a) {
  var currentIndex = a.length;
  var temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = a[currentIndex];
    a[currentIndex] = a[randomIndex];
    a[randomIndex] = temporaryValue;
  }
  return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()

function removeActive() {
  modal.classList.remove("active");
  startGame();
}

// una funzione che calcola il tempo e aggiorna il contenitore sotto

function countTime(){
    let time = new Date();

    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
  
    interval = setInterval(function () {
      time.setSeconds(time.getSeconds() + 1);
      timer.innerHTML =
        "Tempo: " + time.getMinutes() + " min " + time.getSeconds() + " sec";
    }, 1000);
}

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali

function startGame() {
  clearInterval(interval);
  countTime()

  // (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia,
  // pulisce tutti gli elementi che eventualmente contiene
  // poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
  // chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

  var arrayShuffle = shuffle(arrayAnimali);
  let lista = document.querySelector("#griglia");
  lista.innerHTML = "";

  for (elemento of arrayShuffle) {
    let bigBox = document.createElement("div");
    let miniBox = document.createElement("div");
    miniBox.classList.add("icon");
    lista.append(bigBox);
    bigBox.append(miniBox);
    miniBox.innerHTML = elemento;
    miniBox.addEventListener("click", displayIcon);

    console.log(elemento);
  }

 
}

console.log(interval);

function displayIcon() {
  var icon = document.getElementsByClassName("icon");
  var icons = [...icon];

  //mette/toglie la classe show
  this.classList.toggle("show");
  this.classList.toggle("disabled");
  //aggiunge l'oggetto su cui ha cliccato all'array del confronto
  arrayComparison.push(this);

  var len = arrayComparison.length;

  //se nel confronto ci sono due elementi
  if (len === 2) {
    //se sono uguali aggiunge la classe find
    if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
      arrayComparison[0].classList.add("find", "disabled");
      arrayComparison[1].classList.add("find", "disabled");
      count = count + 2;
      console.log(count);
      arrayComparison = [];
    } else {
      //altrimenti (ha sbagliato) aggiunge solo la classe disabled
      icons.forEach(function (item) {
        item.classList.add("disabled");
      });
      // con il timeout rimuove  la classe show per nasconderli
      setTimeout(function () {
        arrayComparison[0].classList.remove("show");
        arrayComparison[1].classList.remove("show");
        icons.forEach(function (item) {
          item.classList.remove("disabled");
        });
        arrayComparison = [];
      }, 700);
    }
  }

  //una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
  if (count === 2) {
    let tempoTrascorso = document.querySelector('#tempoTrascorso')
    modal.classList.add('active')
    tempoTrascorso.innerHTML = timer.innerHTML
  }
}

// una funzione che nasconde la modale alla fine e riavvia il gioco
function playAgain (){
    removeActive()
}

//   Commento personale: cancellato in quanto creava problemi durante l'esecuzione del memory

//   for (var i = 0; i < arrayComparison.length; i++) {
//     arrayComparison[i].classList.add("disabled");
//   }
