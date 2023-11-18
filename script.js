const punktacja = document.getElementsByClassName("points")[0];
let end = document.getElementsByClassName("end")[0];
let ileKomorek = document.getElementsByTagName("div")[1].children.length;

let grid = document.querySelector(".grid_container");
let menu = document.querySelector(".menu");
const music = new Audio("music.mp3");
const click = new Audio("click.mp3");
const win = new Audio("win.mp3");
const ship = new Audio("ship.mp3");

let statki = [1, 2, 3, 4, 5, 6]; //do zmiany
let random = Math.floor(Math.random() * statki.length); //do zmiany
c = 0;
let points = 0;

mainMenu = () => {
  grid.classList.add("remove");
  punktacja.classList.add("remove");
};

generateCells = () => {
  let radio = document.querySelector("input:checked");

  for (let i = 0; i < radio.value * radio.value; i++) {
    let dive = document.createElement("div");
    dive.classList.add("cells");
    grid.append(dive);
  }

  if (radio.value === "3") {
    grid.style.gridTemplateColumns = `repeat(${radio.value} , 1fr)`;
    grid.style.width = "320px";
  } else if (radio.value === "8") {
    grid.style.gridTemplateColumns = `repeat(${radio.value} , 1fr)`;
    grid.style.width = "690px";
    document.querySelectorAll(".cells").forEach((ele) => {
      ele.style.width = "80px";
      ele.style.height = "80px";
      ele.style.fontSize = "50px";
    });
  } else {
    grid.style.gridTemplateColumns = `repeat(${radio.value} , 1fr)`;
  }

  document.querySelectorAll(".cells").forEach((element) => {
    element.addEventListener("click", showCells);
  });
  display();
};

display = () => {
  music.play();
  music.volume = 0.6;
  music.loop;
  menu.classList.add("remove");
  grid.classList.remove("remove");
  punktacja.classList.remove("remove");
  const cellClicked = new Array(ileKomorek).fill(false);

  for (let i = 0; i < statki.length; i++) {
    //do zmiany cala petla
    c += random;

    var bb = grid.querySelectorAll(".cells")[c];

    if (!cellClicked[c]) {
      bb.innerHTML = " ";
      cellClicked[c] = true;
      console.log(c);
    }
  }
};

showCells = (e) => {
  click.play();
  const clickedCell = e.target;

  if (clickedCell.innerHTML === " ") {
    ship.play();
    clickedCell.innerHTML = "🚢";
    console.log(true);
    points++;
    punktacja.innerHTML = "Dodano +" + points + " punkt";

    if (points === statki.length) {
      music.pause();
      win.play();
      console.log("Koniec");
      punktacja.innerHTML = "Zatopiono wszystkie statki!";
      end.innerHTML = "liczba punktow :" + "  " + points;

      document.querySelectorAll(".cells").forEach((element) => {
        element.removeEventListener("click", showCells);
      });
    }
  } else {
    punktacja.innerHTML = "Pudlo, 0 punktów!";

    clickedCell.innerHTML = "⚓";
  }

  clickedCell.removeEventListener("click", showCells);
};

let start = document
  .querySelector(".btnStart")
  .addEventListener("click", generateCells);
mainMenu();
