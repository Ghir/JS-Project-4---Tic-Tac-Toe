!function () {

const board = document.getElementById('board'),
board1 = document.getElementById('player1'),
board2 = document.getElementById('player2'),
wrap = document.querySelector('.wrap'),
buttons = document.getElementsByClassName('button'),
squares = document.getElementsByClassName('box');
squaresArray = Array.from(squares);
startPage = document.getElementsByClassName('screen-start')[0],
endPage = document.getElementsByClassName('screen-win')[0],
input1 = document.getElementById('input1'),
input2 = document.getElementById('input2'),
name1 = document.createElement('div'),
name2 = document.createElement('div');
name1.classList.add('name1');
name2.classList.add('name2');

// show only start page first
board.style.display = 'none';
endPage.style.display = 'none';
startPage.style.display = '';

// constructor function
function Player (icon, number) {
  this.active = false;
  this.icon = `url(img/${icon}.svg)`;
}

function win (player, number) {
  board.style.display = 'none';
  endPage.classList.add(`screen-win-${number}`);
  endPage.style.display = '';
  if (player.name) {
    document.querySelector('.message').textContent = `${(player.name)} wins!`
  }
  else {
    if (player == 'computer') {
      document.querySelector('.message').textContent = `Computer wins`
    }
    else {
      document.querySelector('.message').textContent = `Winner`
    }
  }
}

// create players
const player1 = new Player('o', 'one');
const player2 = new Player('x', 'two');

function getWinner () {
  function includes (element) {
    if (element.className.includes('1')) {
      return 'o'
    }
    else if (element.className.includes('2')) {
      return 'x'
    }
  }
  // circle wins
  if (
    (includes(squares[0]) == 'o' && includes(squares[1]) == 'o' && includes(squares[2]) == 'o') ||
    (includes(squares[3]) == 'o' && includes(squares[4]) == 'o' && includes(squares[5]) == 'o') ||
    (includes(squares[6]) == 'o' && includes(squares[7]) == 'o' && includes(squares[8]) == 'o') ||
    (includes(squares[0]) == 'o' && includes(squares[3]) == 'o' && includes(squares[6]) == 'o') ||
    (includes(squares[1]) == 'o' && includes(squares[4]) == 'o' && includes(squares[7]) == 'o') ||
    (includes(squares[2]) == 'o' && includes(squares[5]) == 'o' && includes(squares[8]) == 'o') ||
    (includes(squares[0]) == 'o' && includes(squares[4]) == 'o' && includes(squares[8]) == 'o') ||
    (includes(squares[2]) == 'o' && includes(squares[4]) == 'o' && includes(squares[6]) == 'o')) {
      win(player1, 'one');
  }
  // cross wins
  else if (
    (includes(squares[0]) == 'x' && includes(squares[1]) == 'x' && includes(squares[2]) == 'x') ||
    (includes(squares[3]) == 'x' && includes(squares[4]) == 'x' && includes(squares[5]) == 'x') ||
    (includes(squares[6]) == 'x' && includes(squares[7]) == 'x' && includes(squares[8]) == 'x') ||
    (includes(squares[0]) == 'x' && includes(squares[3]) == 'x' && includes(squares[6]) == 'x') ||
    (includes(squares[1]) == 'x' && includes(squares[4]) == 'x' && includes(squares[7]) == 'x') ||
    (includes(squares[2]) == 'x' && includes(squares[5]) == 'x' && includes(squares[8]) == 'x') ||
    (includes(squares[0]) == 'x' && includes(squares[4]) == 'x' && includes(squares[8]) == 'x') ||
    (includes(squares[2]) == 'x' && includes(squares[4]) == 'x' && includes(squares[6]) == 'x')) {
      if (gametype.value == 'player') {
        win(player2, 'two');
      }
      else {
        win('computer', 'two')
      }
  }
  // draw
  if (squaresArray.filter(el => !el.className.includes('filled')).length == 0 && endPage.style.display == 'none') {
    board.style.display = 'none';
    endPage.style.display = '';
    endPage.classList.add('screen-win-tie');
    document.querySelector('.message').textContent = "It's a draw";
  }
}

document.getElementById('gametype').addEventListener('change', () => {
  if (document.getElementById('gametype').value == 'computer') {
    input2.style.display = 'none';
  }
  else {
    input2.style.display = '';
  }
})


document.addEventListener('click', function (event) {
  // start/new game
  if (event.target.className == 'button') {
    startPage.style.display = 'none';
    if (!player1.active && !player2.active) {
      if (document.getElementById('gametype').value == 'player') {
        player1.name = input1.value;
        player2.name = input2.value;
      }
      else {
        player1.name = input1.value;
      }
      player1.active = true;
      name1.textContent = player1.name;
      board1.appendChild(name1);
      name2.textContent = player2.name;
      board2.appendChild(name2);
    }
    endPage.style.display = 'none';
    endPage.classList.remove('screen-win-one');
    endPage.classList.remove('screen-win-two');
    endPage.classList.remove('screen-win-tie');
    squaresArray.forEach(el => {
      el.classList.remove('box-filled-1');
      el.classList.remove('box-filled-2');
    })
    // show board
    board.style.display = '';
    if (player1.active) {
      board1.classList.add('active');
      board2.classList.remove('active');
    } else {
      board2.classList.add('active');
      board1.classList.remove('active');
    }
  }

if (event.target.className == 'box') {
  if (!event.target.className.includes('filled')) {
    if (document.getElementById('gametype').value == 'player') {
      if (player1.active) {
        event.target.classList.add('box-filled-1');
        player1.active = false;
        player2.active = true;
        board2.classList.add('active');
        board1.classList.remove('active');
      }
      else if (player2.active) {
        event.target.classList.add('box-filled-2')
        player1.active = true;
        player2.active = false;
        board1.classList.add('active');
        board2.classList.remove('active');
      }
      getWinner();
    }
    else {
      event.target.classList.add('box-filled-1');
      getWinner();
      if (endPage.style.display == 'none') {
        const emptyBoxes = squaresArray.filter(el => !el.className.includes('filled'));
        const randomNum = Math.floor(Math.random()*(emptyBoxes.length - 1));
        emptyBoxes[randomNum].classList.add('box-filled-2');
        getWinner();
      }
    }
  }
}
})


document.addEventListener('mouseover', function (event) {
  if (event.target.className == 'box') {
    if (player1.active && window.getComputedStyle(event.target).backgroundImage == 'none') {
      event.target.style.backgroundImage = player1.icon
    }
    else if (player2.active && window.getComputedStyle(event.target).backgroundImage == 'none') {
      event.target.style.backgroundImage = player2.icon
    }
  }
})
document.addEventListener('mouseout', function (event) {
  if (event.target.className == 'box') {
  event.target.style.backgroundImage = ''
}})

}();
