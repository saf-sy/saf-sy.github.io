const BLACK = "#000000";
const WHITE = "#FFFFFF";
const CELL_SIZE = 80;
const CELL_MARGIN = 10;
const WINDOW_SIZE = [5 * CELL_SIZE + 6 * CELL_MARGIN, 5 * CELL_SIZE + 6 * CELL_MARGIN];

const ethan = ["Typing Sound",
               "Splatoon",
               "Toasty",
               "MC Server",
               "Muted",
               "Tierlists",
               "Among Us",
               "Gasp",
               "Screenshot",
               "Poll",
               "Random Link",
               "\"Wait...\"",
               "\"Mmm\"",
               "Funny",
               "Good Joke (!)",
               "Reference",
               "Sorry (x3)"];

const aidan = ["singing",
               "bad joke",
               "unfunny status",
               "that one laugh",
               "()",
               "repeat",
               "DM meme",
               "Ice Spice",
               "INTERRUPTING"];

function createBingoBoard(person) {
  // Set up random number generator
  const today = new Date();
  const seed = today.getTime();
  const random = new Math.seedrandom(seed);

  // Generate random list of 24 unique elements
  const bingoWords = person.slice();
  const myArray = [];
  while (myArray.length < 24) {
    const index = Math.floor(random() * bingoWords.length);
    const element = bingoWords.splice(index, 1)[0];
    myArray.push(element);
  }
  myArray.splice(12, 0, "Free Space");

  // Initialize Canvas
  const canvas = document.createElement("canvas");
  canvas.width = WINDOW_SIZE[0];
  canvas.height = WINDOW_SIZE[1];
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  // Set up font
  const fontSize = 20;
  ctx.font = `${fontSize}px sans-serif`;

  // Create 5x5 matrix of cells
  const cells = [];
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      const x = (CELL_SIZE + CELL_MARGIN) * j + CELL_MARGIN;
      const y = (CELL_SIZE + CELL_MARGIN) * i + CELL_MARGIN;
      const cellRect = [x, y, CELL_SIZE, CELL_SIZE];
      const cellText = myArray[i * 5 + j];
      const textWidth = ctx.measureText(cellText).width;
      const textX = x + CELL_SIZE / 2;
      const textY = y + CELL_SIZE / 2 + fontSize / 2;
      row.push([cellRect, cellText, textX, textY, false]);
    }
    cells.push(row);
  }

  // Main game loop
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const [cellRect, cellText, textX, textY, crossedOut] = cells[i][j];
        const [cellX, cellY, cellWidth, cellHeight] = cellRect;
        if (x >= cellX && x < cellX + cellWidth && y >= cellY && y < cellY + cellHeight) {
      // Toggle crossed out status
      cells[i][j][4] = !crossedOut;
      
      // Redraw cell with updated crossed out status
      ctx.fillStyle = crossedOut ? BLACK : WHITE;
      ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
      ctx.fillStyle = crossedOut ? WHITE : BLACK;
      ctx.fillText(cellText, textX, textY);
      
      // Check for win
      if (checkForWin(cells)) {
        alert("Bingo! You won!");
      }
    }
  }
}

});

// Draw initial board
ctx.fillStyle = WHITE;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = BLACK;
ctx.fillRect(CELL_MARGIN, CELL_MARGIN, WINDOW_SIZE[0] - 2 * CELL_MARGIN, WINDOW_SIZE[1] - 2 * CELL_MARGIN);
ctx.fillStyle = WHITE;
for (let i = 0; i < 5; i++) {
for (let j = 0; j < 5; j++) {
const [cellRect, cellText, textX, textY] = cells[i][j];
ctx.fillRect(...cellRect);
ctx.fillStyle = BLACK;
ctx.fillText(cellText, textX, textY);
ctx.fillStyle = WHITE;
}
}

// Helper function to check for win
function checkForWin(cells) {
// Check rows
for (let i = 0; i < 5; i++) {
if (cells[i].every(cell => cell[4])) {
return true;
}
}

css

// Check columns
for (let j = 0; j < 5; j++) {
  let crossedOutCount = 0;
  for (let i = 0; i < 5; i++) {
    if (cells[i][j][4]) {
      crossedOutCount++;
    }
  }
  if (crossedOutCount === 5) {
    return true;
  }
}

// Check diagonal from top left to bottom right
let crossedOutCount = 0;
for (let i = 0; i < 5; i++) {
  if (cells[i][i][4]) {
    crossedOutCount++;
  }
}
if (crossedOutCount === 5) {
  return true;
}

// Check diagonal from top right to bottom left
crossedOutCount = 0;
for (let i = 0; i < 5; i++) {
  if (cells[i][4 - i][4]) {
    crossedOutCount++;
  }
}
if (crossedOutCount === 5) {
  return true;
}

// If no win conditions are met, return false
return false;

}
}

// Call function to create Bingo board for Ethan and Aidan
createBingoBoard(ethan);
