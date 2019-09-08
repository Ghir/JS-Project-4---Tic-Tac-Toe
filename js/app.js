!function () {

const board = document.querySelector('.board'),
board1 = document.querySelector('#player1'),
board2 = document.querySelector('#player2'),
boxes = document.querySelectorAll('.box'),
boxesArray = Array.from(boxes),
endPage = document.querySelector('.screen-win'),
gameSelection = document.querySelector('.gameSelection'),
name1 = document.createElement('div'),
name2 = document.createElement('div');
name1.classList.add('name1'),
name2.classList.add('name2');

class Player {
  constructor(iconName) {
    this.icon = `url(img/${iconName}.svg)`;
    this.id = iconName === 'o' ? 'one' : 'two'
  }
  active = false;
  name;
}

const player1 = new Player('o');
const player2 = new Player('x');

const endGame = player => {
  board.style.display = 'none';
  endPage.style.display = 'block';
  if (player) {
    endPage.classList.add(`screen-win-${player.id}`);
    document.querySelector('.message').textContent = player.name || 'Winner';
  } else {
    endPage.classList.add('screen-win-tie');
    document.querySelector('.message').textContent = "It's a draw";
  }

}

const evaluate = () => {
  const combinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (com of combinations) {
    if (boxes[com[0]].className === boxes[com[1]].className && boxes[com[1]].className === boxes[com[2]].className && boxes[com[0]].className.includes('filled')) {
      const player = boxes[com[0]].className.includes('1') ? player1 : player2;
      return endGame(player);
    }
  }
  if (boxesArray.filter(el => !el.className.includes('filled')).length === 0) {
    endGame(null);
  }
}

gameSelection.addEventListener('change', function () {
  document.querySelector('#input2').style.display = this.value === 'computer' ? 'none' : '';
});


document.addEventListener('click',  ev => {
  // start game
  if (ev.target.matches('.button')) {
    document.querySelector('.screen-start').style.display = 'none';
    if (!player1.active && !player2.active) {
      const input1 = document.querySelector('#input1')
      if (gameSelection.value === 'player') {
        player1.name = input1.value;
        player2.name = document.querySelector('#input2').value;
      } else {
        player1.name = input1.value;
        player2.name = 'Computer';
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
    boxesArray.forEach(el => {
      el.classList.remove('box-filled-1');
      el.classList.remove('box-filled-2');
    })
    board.style.display = 'block';
    if (player1.active) {
      board1.classList.add('active');
      board2.classList.remove('active');
    } else {
      board2.classList.add('active');
      board1.classList.remove('active');
    }
  }

// fill boxes
if (ev.target.matches('.box') && !ev.target.className.includes('filled')) {
  if (gameSelection.value === 'player') {
    if (player1.active) {
      ev.target.classList.add('box-filled-1');
      player1.active = false;
      player2.active = true;
      board2.classList.add('active');
      board1.classList.remove('active');
  } else if (player2.active) {
      ev.target.classList.add('box-filled-2')
      player1.active = true;
      player2.active = false;
      board1.classList.add('active');
      board2.classList.remove('active');
    }
    return evaluate();
  }
  ev.target.classList.add('box-filled-1');
  evaluate();
  if (endPage.style.display === 'none') {
    const emptyBoxes = boxesArray.filter(el => !el.className.includes('filled'));
    const randomNum = Math.floor(Math.random()*(emptyBoxes.length - 1));
    emptyBoxes[randomNum].classList.add('box-filled-2');
    evaluate();
  }
}})


document.addEventListener('mouseover', ev => {
  if (ev.target.matches('.box')) {
    ev.target.style.backgroundImage = player1.active && window.getComputedStyle(ev.target).backgroundImage === 'none' ? player1.icon : player2.icon;
  }
})

document.addEventListener('mouseout', ev => {
  if (ev.target.matches('.box')) {
  ev.target.style.backgroundImage = ''
}})

}();
