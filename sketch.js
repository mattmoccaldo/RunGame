let runners = [];
let gameState = "RACE"; // Stati: "RACE", "QUESTION", "END"
let winnerIndex = -1;
let currentQuestion = "";
let userAnswer = "";
let finishLineX = 700;

let topics = [
  { 
    name: "Gestione Processore", 
    color: "#E74C3C", 
    challenges: [
      "Come si chiama l'algoritmo di scheduling a turni di tempo prefissati?",
      "Un programma caricato in RAM e in fase di esecuzione si chiama...?",
      "Quale componente del SO decide quale processo mandare in CPU?"
    ]
  },
  { 
    name: "Memoria Centrale", 
    color: "#3498DB", 
    challenges: [
      "Come si chiama l'hardware che traduce gli indirizzi virtuali in fisici?",
      "Come si chiama la tecnica che divide la memoria in blocchi di dimensione fissa?",
      "Quale tipo di memoria volatile perde i dati quando si spegne il PC?"
    ]
  },
  { 
    name: "Periferiche & File System", 
    color: "#2ECC71", 
    challenges: [
      "Quale meccanismo di I/O permette di trasferire dati in memoria senza CPU?",
      "Un percorso che parte direttamente dalla radice (root) si dice...?",
      "Come si chiama la directory principale da cui parte il file system?"
    ]
  },
  { 
    name: "Comandi Base Linux", 
    color: "#F1C40F", 
    challenges: [
      "Quale comando serve per elencare i file in una cartella?",
      "Quale comando permette di cambiare la cartella corrente?",
      "Quale comando si usa per creare una nuova cartella?"
    ]
  }
];

function setup() {
  createCanvas(800, 450);
  // Inizializzazione concorrenti
  for (let i = 0; i < topics.length; i++) {
    runners.push({ x: 50, y: 100 + i * 80 });
  }
}

function draw() {
  background(20, 25, 40);
  
  if (gameState === "RACE") {
    drawGame();
  } else if (gameState === "QUESTION") {
    displayQuestionScreen();
  } else if (gameState === "END") {
    displayEndScreen();
  }
}

function drawGame() {
  // Legenda in alto
  for (let i = 0; i < topics.length; i++) {
    fill(topics[i].color);
    rect(30 + i * 190, 15, 15, 15);
    fill(220);
    textSize(11);
    textAlign(LEFT, CENTER);
    text(topics[i].name, 50 + i * 190, 22);
  }

  // Corsie e linea di arrivo
  stroke(60);
  strokeWeight(2);
  for (let i = 0; i <= topics.length; i++) {
    line(30, 70 + i * 80, 770, 70 + i * 80);
  }
  
  stroke("#FF0064");
  strokeWeight(4);
  line(finishLineX, 70, finishLineX, 390);

  // Avanzamento e disegno dei concorrenti
  for (let i = 0; i < runners.length; i++) {
    runners[i].x += random(1, 4); // Movimento casuale
    
    fill(topics[i].color);
    noStroke();
    rect(runners[i].x, runners[i].y, 30, 30, 5);
    
    // Controllo vincitore
    if (runners[i].x >= finishLineX) {
      winnerIndex = i;
      currentQuestion = random(topics[i].challenges);
      gameState = "QUESTION";
      break;
    }
  }
}

function displayQuestionScreen() {
  fill(0, 200);
  rect(0, 0, width, height);
  
  textAlign(CENTER);
  fill(255);
  textSize(20);
  text("GARA TERMINATA!", width / 2, 80);
  
  fill(topics[winnerIndex].color);
  textSize(16);
  text("Vincitore: " + topics[winnerIndex].name, width / 2, 115);
  
  // Box della domanda
  fill(30, 40, 60);
  stroke(topics[winnerIndex].color);
  strokeWeight(2);
  rect(100, 150, 600, 100, 10);
  
  fill(255);
  noStroke();
  textSize(14);
  text(currentQuestion, width / 2, 200);
  
  // Box di risposta dell'utente
  fill(15, 20, 30);
  stroke(100);
  rect(200, 300, 400, 35, 5);
  
  fill("#00FF96");
  textAlign(LEFT, CENTER);
  text(userAnswer + (frameCount % 60 < 30 ? "_" : ""), 210, 317);
}

function displayEndScreen() {
  fill(20, 25, 40);
  rect(0, 0, width, height);
  
  textAlign(CENTER);
  fill("#00FF96");
  textSize(24);
  text("RISPOSTA REGISTRATA!", width / 2, 180);
  
  fill(220);
  textSize(14);
  text("Premi 'R' per riavviare la gara.", width / 2, 250);
}

function keyPressed() {
  if (gameState === "QUESTION") {
    if (keyCode === ENTER && userAnswer.trim().length > 0) {
      gameState = "END";
    } else if (keyCode === BACKSPACE) {
      userAnswer = userAnswer.slice(0, -1);
    } else if (key.length === 1) {
      userAnswer += key;
    }
  } else if (gameState === "END" && (key === 'r' || key === 'R')) {
    resetGame();
  }
}

function resetGame() {
  for (let i = 0; i < runners.length; i++) {
    runners[i].x = 50;
  }
  userAnswer = "";
  winnerIndex = -1;
  gameState = "RACE";
}