const canvas = document.getElementById("canvas");
const cells = document.querySelectorAll(".cell");
const count = document.getElementById("count");

const gridAreas = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

const gridTemplateAreas = [
  `
        "a a b b"
        "c . d d"
        "e f g h"
        "e f i h"
    `,
  `
        "a b b c"
        "a . d d"
        "f f g h"
        "e e i h"
    `,
  `
        "a a b b"
        "c d d g"
        "e . f g"
        "e h h i"
    `,
  `
        "a a b c"
        "d e . c"
        "f f g g"
        "h h h i"
    `,
  `
        "a a b b"
        "c c c d"
        "e f g g"
        "e h . i"
    `,
  `
        "a b b c"
        "d . e c"
        "f g g g"
        "f h h i"
    `
];

// a random function to generate a random number
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateGridTemplateArea = () => {
  let gridTemplateArea = "";
  return gridTemplateArea;
};

console.log(generateGridTemplateArea());

// a function that generates 4 numbers between 1 and 4 so that the total of the 4 numbers is allways 10 and exclude 0
const generateNumbers = () => {
  const numbers = [];
  let total = 0;
  for (let i = 0; i < 4; i++) {
    const number = random(1, 10 - total - (3 - i));
    numbers.push(number);
    total += number;
  }
  return numbers;
};

const setCanvas = () => {
  // use the generate numbers function to get 4 numbers for --canvas-columns and add fr to each number
  const columns = generateNumbers();
  canvas.style.setProperty(
    "--canvas-columns",
    columns.map((number) => `${number}fr`).join(" ")
  );
  const rows = generateNumbers();
  canvas.style.setProperty(
    "--canvas-rows",
    rows.map((number) => `${number}fr`).join(" ")
  );

  // get a random index from the gridTemplateAreas array
  const randomIndex = random(0, gridTemplateAreas.length - 1);
  // set the grid-template-areas property of the canvas to the random gridTemplateAreas
  canvas.style.setProperty(
    "grid-template-areas",
    gridTemplateAreas[randomIndex]
  );

  // randomize the grid areas of the cells but each cell should have a unique grid area name
  const randomGridAreas = gridAreas.sort(() => Math.random() - 0.5);
  cells.forEach((cell, index) => {
    cell.style.setProperty("grid-area", randomGridAreas[index]);
  });

  // enable clicking again on the canvas
  canvas.style.pointerEvents = "auto";

  // set the opacity of the cells to 1 one by one with a delay of 0.1 seconds
  cells.forEach((cell, index) => {
    setTimeout(() => {
      cell.style.setProperty("opacity", 1);
    }, index * 100);
  });

  // set the count to a random number between 000 and 999
  count.textContent = "#" + random(0, 999).toString().padStart(3, "0");
};

canvas.addEventListener("click", setCanvas);
