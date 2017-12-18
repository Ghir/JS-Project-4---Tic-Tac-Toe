// JS-Project-4---Tic-Tac-Toe

!function () {

// declare variables
const board = document.getElementById('board'),
board1 = document.getElementById('player1'),
board2 = document.getElementById('player2'),
wrap = document.querySelector('.wrap'),
buttons = document.getElementsByClassName('button'),
squares = document.getElementsByClassName('box');
squaresArray = Array.from(squares);
b1 = squares[0],
b2 = squares[1],
b3 = squares[2],
b4 = squares[3],
b5 = squares[4],
b6 = squares[5],
b7 = squares[6],
b8 = squares[7],
b9 = squares[8],
name1 = document.createElement('div'),
name2 = document.createElement('div');
name1.classList.add('name1');
name2.classList.add('name2');

// create start page
const startContainer = document.createElement('div');
startContainer.className = 'screen screen-start';
startContainer.innerHTML = `
<header>
  <h1>Tic Tac Toe</h1>
    <select id="gametype" name="gametype">
      <option value="player">VS Player 2</option>
      <option value="computer">VS Computer</option>
    </select>
  <a href="#" class="button">Start game</a>
</header>
`;

// create end page
const endContainer = document.createElement('div');
endContainer.className = 'screen screen-win';
endContainer.id = 'finish';
endContainer.innerHTML = `
<header>
  <h1>Tic Tac Toe</h1>
  <p class="message"></p>
  <a href="#" class="button">New game</a>
</header>
`;

// append start and end pages
wrap.appendChild(startContainer);
wrap.appendChild(endContainer);
// show only start page first
board.style.display = 'none';
endContainer.style.display = 'none';
startContainer.style.display = '';

// constructor function
function Player (icon, number) {
  this.active = false;
  this.icon = `url(img/${icon}.svg)`;
  this.win = function () {
    board.style.display = 'none';
    endContainer.classList.add(`screen-win-${number}`);
    endContainer.style.display = '';
    document.querySelector('.message').textContent = `${(this.name || 'Computer')} wins!`
  };
}

// create players
const player1 = new Player('o', 'one');
const player2 = new Player('x', 'two');

// to prompt players name
function getPlayerName(id) {
  let name = prompt(`Enter Player ${id}'s Name to proceed`);
  while (name === null || name === '') {
    name = prompt(`Enter Player ${id}'s' Name to proceed`);
  }
  return name;
}

// to calculate result
function getWinner () {
  // to calculate if square is filled with circle or cross
  function includes (element) {
    if (element.className.includes('1')) {
      return 'o'
    }
    else if (element.className.includes('2')) {
      return 'x'
    }
  }
  // circle win
  if (
    (includes(b1) == 'o' && includes(b2) == 'o' && includes(b3) == 'o') ||
    (includes(b4) == 'o' && includes(b5) == 'o' && includes(b6) == 'o') ||
    (includes(b7) == 'o' && includes(b8) == 'o' && includes(b9) == 'o') ||
    (includes(b1) == 'o' && includes(b4) == 'o' && includes(b7) == 'o') ||
    (includes(b2) == 'o' && includes(b5) == 'o' && includes(b8) == 'o') ||
    (includes(b3) == 'o' && includes(b6) == 'o' && includes(b9) == 'o') ||
    (includes(b1) == 'o' && includes(b5) == 'o' && includes(b9) == 'o') ||
    (includes(b3) == 'o' && includes(b5) == 'o' && includes(b7) == 'o')) {
      player1.win();
  }
  // cross win
  else if (
    (includes(b1) == 'x' && includes(b2) == 'x' && includes(b3) == 'x') ||
    (includes(b4) == 'x' && includes(b5) == 'x' && includes(b6) == 'x') ||
    (includes(b7) == 'x' && includes(b8) == 'x' && includes(b9) == 'x') ||
    (includes(b1) == 'x' && includes(b4) == 'x' && includes(b7) == 'x') ||
    (includes(b2) == 'x' && includes(b5) == 'x' && includes(b8) == 'x') ||
    (includes(b3) == 'x' && includes(b6) == 'x' && includes(b9) == 'x') ||
    (includes(b1) == 'x' && includes(b5) == 'x' && includes(b9) == 'x') ||
    (includes(b3) == 'x' && includes(b5) == 'x' && includes(b7) == 'x')) {
      player2.win();
  }
  // draw
  if (squaresArray.filter(el => !el.className.includes('filled')).length == 0 && endContainer.style.display == 'none') {
    board.style.display = 'none';
    endContainer.style.display = '';
    endContainer.classList.add('screen-win-tie');
    document.querySelector('.message').textContent = "It's a draw";
  }
}

// start/new game click
Array.from(buttons).forEach(el => {
  el.addEventListener('click', () => {
  // if first game set player 1 to active and set names
  if (!player1.active && !player2.active) {
    if (document.getElementById('gametype').value == 'player') {
      player1.name = getPlayerName(1);
      player2.name = getPlayerName(2);
    }
    else {
      player1.name = getPlayerName(1);
    }
    player1.active = true;
    name1.textContent = player1.name;
    board1.appendChild(name1);
    name2.textContent = player2.name;
    board2.appendChild(name2);
  }
  // hide start page
  startContainer.style.display = 'none';
  // if not first game, clear everything
  endContainer.style.display = 'none';
  endContainer.classList.remove('screen-win-one');
  endContainer.classList.remove('screen-win-two');
  endContainer.classList.remove('screen-win-tie');
  squaresArray.forEach(el => {
    el.classList.remove('box-filled-1');
    el.classList.remove('box-filled-2');
  })
  // show board
  board.style.display = '';
  // switch highlight
  if (player1.active) {
    board1.classList.add('active');
    board2.classList.remove('active');
  } else {
    board2.classList.add('active');
    board1.classList.remove('active');
  }

})
});

// SQUARES MOUSEOVER
// show circle or cross in squares when mouse over, based on which player is active
// and if the square is not already occupied
squaresArray.forEach(el => {
  el.addEventListener('mouseover', () => {
    if (player1.active && window.getComputedStyle(el).backgroundImage == 'none') {
      el.style.backgroundImage = player1.icon
    }
    else if (player2.active && window.getComputedStyle(el).backgroundImage == 'none') {
      el.style.backgroundImage = player2.icon
    }
});
  el.addEventListener('mouseout', () => el.style.backgroundImage = '')
});

// SQUARES CLICK
squaresArray.forEach(el => {
  el.addEventListener('click', () => {
    if (!el.className.includes('filled')) {
      // if player VS player 2
      if (document.getElementById('gametype').value == 'player') {
        // fill square and switch active player
        if (player1.active) {
          el.classList.add('box-filled-1');
          player1.active = false;
          player2.active = true;
          board2.classList.add('active');
          board1.classList.remove('active');
        }
        else if (player2.active) {
          el.classList.add('box-filled-2')
          player1.active = true;
          player2.active = false;
          board1.classList.add('active');
          board2.classList.remove('active');
        }
        getWinner();
      }
      // if player VS computer
      else {
        // fill square
        el.classList.add('box-filled-1');
        getWinner();
        // if player 1 didn't win generate a random number and fill one of the empty squares with a cross
        if (endContainer.style.display == 'none') {
          const emptyBoxes = squaresArray.filter(el => !el.className.includes('filled'));
          const randomNum = Math.floor(Math.random()*(emptyBoxes.length - 1));
          emptyBoxes[randomNum].classList.add('box-filled-2');
          getWinner();
        }
      }
    }
  })
})

}();
