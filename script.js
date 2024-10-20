//DOM Elements
let table = document.createElement("table");
let contentDiv = document.getElementById("content");
let restartBtn = document.getElementById("restart-btn");
let menu = document.getElementById("menu");
let menuBtn = document.querySelectorAll(".btn-menu");
let text = document.getElementsByClassName("disable-text")[0];
let resultScreen = document.getElementsByClassName("end-game")[0];
let resultPoints = document.getElementById("result-points");

//Audio fragments
let backgroundMusic = new Audio("/src/audio/music.mp3");
let click = new Audio("/src/audio/click.mp3");
let ship = new Audio("/src/audio/ship.mp3");
let winner = new Audio("/src/audio/win.mp3");

//Game state variables
let hitShips = [];
let tabs = [];
let shipsClicked = 0;
let num = 0;
let points = 0;
let cells = {};

//push table to DOM Element
contentDiv.append(table);

//Game variants - level easy
gameVariantsEasy = () => {
  return [
    [
      [8, 0, 1, 2],
      [5, 6, 7, 14],
      [24, 25, 26, 34],
      [55, 63, 62, 61],
      [49, 50],
    ],
    [
      [11, 12, 13, 20],
      [54, 55],
      [32, 33, 34, 41],
      [37, 38, 39, 31],
      [52, 60],
    ],

    [
      [1, 2, 10, 18],
      [45, 53],
      [33, 34, 35, 41],
      [20, 21, 22, 13],
      [56, 57],
    ],
    [
      [10, 11],
      [32, 33, 24, 16],
      [14, 15],
      [45, 46, 47, 54],
    ],
    [
      [31, 39],
      [27, 28, 29, 19],
      [43, 44],
      [48, 41, 49, 57],
    ],
    [
      [10, 18, 26, 19],
      [29, 30],
      [56, 57, 58, 50],
      [47, 55, 63, 62],
    ],
  ];
};

//Game variants - level medium
gameVariantsMedium = () => {
  return [
    [
      [0, 1, 2, 3, 4],
      [6, 7, 8, 16],
      [24, 34, 44, 45],
      [20, 21],
      [40, 50, 60, 70],
      [63, 64],
      [83, 84, 85, 95],
      [90, 91],
      [69, 79, 89, 78],
      [47, 48],
    ],
    [
      [5, 6, 7, 16],
      [11, 12, 13, 23],
      [30, 31],
      [35, 45, 55, 56],
      [60, 61, 50, 70],
      [84, 85, 86, 96],
      [90, 91],
      [68, 69, 79, 89],
      [48, 38, 28],
    ],
    [
      [7, 8, 9, 18],
      [1, 11, 12, 13],
      [5, 15, 25, 26],
      [44, 45, 46, 56],
      [38, 39, 49, 59],
      [73, 74, 75],
      [90, 91, 92, 93],
      [68, 78, 88],
      [50, 51],
    ],
    [
      [5, 6],
      [11, 12, 22, 32],
      [24, 25, 26, 27],
      [45, 46, 47, 57],
      [50, 51],
      [70, 71, 72],
      [84, 85, 86, 96],
      [90, 91],
      [78, 79, 89],
      [9, 19, 29, 39],
    ],
  ];
};

//Main menu event listener
mainMenu = () => {
  menuBtn.forEach((buttons) => {
    buttons.addEventListener("click", (button) => {
      if (button.target.textContent == "Medium") {
        cells = { row: 30, columns: 10 };
        menu.classList.add("disable");
        startGame(gameVariantsMedium());
      }
      if (button.target.textContent == "Easy") {
        cells = { row: 23, columns: 8 };
        menu.classList.add("disable");
        startGame(gameVariantsEasy());
      }
      contentDiv.classList.add("activ");
    });
  });
};

//Create board
createBoard = () => {
  table.innerHTML = "";
  for (let i = 0; i < cells.row; i++) {
    if (i % 3 === 0) {
      const tr = document.createElement("tr");
      for (let j = 0; j < cells.columns; j++) {
        const td = document.createElement("td");
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }
  contentDiv.appendChild(table);
};

//Check win function
checkWin = (event, newArr) => {
  let img = document.createElement("img");
  click.play();

  if (event.querySelector("img")) return;

  event.style.animation = "scale 0.3s";
  text.classList.add("activated");

  text.addEventListener("animationend", () =>
    text.classList.remove("activated")
  );

  if (event.classList.contains("active")) {
    img.src = "/src/img/tank.png";
    event.append(img);
    text.innerHTML = "+5 point!";
    points += 5;
    text.style.color = "rgb(60, 184, 11)";
    event.classList.remove("active");
    shipsClicked++;
    event.style.backgroundColor = "rgb(39, 151, 157)";

    for (let i = 0; i < newArr[0].length; i++) {
      if (newArr[0][i].includes(parseInt(event.id))) {
        hitShips[i]++;
        if (hitShips[i] === newArr[0][i].length) {
          ship.play();
          text.innerHTML = "+10 points!";
          points += 5;
          text.style.color = "rgb(11, 156, 35)";
        }
      }
    }
  } else {
    img.src = "/src/img/wave.png";
    event.append(img);
    text.innerHTML = "-1 point!";
    points -= 1;
    text.style.color = "red";
    event.classList.remove("active");
  }

  if (points < 0) points = 0;

  if (tabs.length == shipsClicked) {
    winner.play();
    resultPoints.innerHTML = points;
    backgroundMusic.pause();
    contentDiv.classList.remove("activ");
    resultScreen.style.animation = "scale 0.3s";
    resultScreen.classList.add("active");
  }

  img.style.animation = "pulse 2s infinite";
  console.log(points);
};

// Start game logic
startGame = (tab) => {
  createBoard();
  backgroundMusic.play();
  backgroundMusic.loop = true;
  let tdEl = document.querySelectorAll("td");
  let randomVariant = tab[Math.round(Math.random() * (tab.length - 1))];
  let newArr = [[...randomVariant]];
  hitShips = newArr[0].map(() => 0);

  //Attach event listeners
  tdEl.forEach((event) => {
    event.id = num;
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        for (let k = 0; k < newArr[i][j].length; k++) {
          if (event.id == newArr[i][j][k]) {
            tabs.push(k);
            event.classList.add("active");
          }
        }
      }
    }
    num++;
    //Event listener to call checkWin
    event.addEventListener("click", () => checkWin(event, newArr));
  });
};

//Press "esc" and go to main menu / restart game
window.addEventListener("keydown", (event) => {
  if (event.key == "Escape") window.location.reload();
});

//Restart game
restartBtn.addEventListener("click", () => window.location.reload());

//Init
mainMenu();
