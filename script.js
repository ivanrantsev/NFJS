const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    startButton = document.querySelector('.startButton'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
    game = document.querySelector('.game');
    radio1 = document.querySelector('#radio-1');
    radio2 = document.querySelector('#radio-2');
    radio3 = document.querySelector('#radio-3');
    audio = document.querySelector('audio');

car.classList.add('car');

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};

const setting = {
    start: false,
    score: 0,
    bestScore: 0,
    speed: 3,
    traffic: 2,
};


const enemyCar = new Array (
    'url(img/enemy/1.png)',
    'url(img/enemy/2.png)',
    'url(img/enemy/3.png)',
    'url(img/enemy/4.png)',
    'url(img/enemy/5.png)',
    'url(img/enemy/6.png)'
);

const treesCollection = new Array (
    'url(img/trees/1.png)',
    'url(img/trees/2.png)',
    'url(img/trees/3.png)',
    'url(img/trees/4.png)',
    'url(img/trees/5.png)',
    'url(img/trees/6.png)',
    'url(img/trees/7.png)',
    'url(img/trees/8.png)'
);

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement;
}


function startGame() {
    audio.play();
    audio.volume = 0.5;
    console.dir(audio);
    start.classList.add('hide');
    gameArea.innerHTML = '';
    score.style.top = '0px';
    if (radio1.checked) {
        setting.traffic = 3;
    }
    if (radio2.checked) {
        setting.traffic = 2;
    }
    if (radio3.checked) {
        setting.traffic = 1.5;
    }
    setting.speed = +document.querySelector('#gameSpeed').value + 3;
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100); i++) {
        const tree = document.createElement('div');
        tree.classList.add('tree');
        tree.y = 100 * i;
        tree.style.top = (i * 100) + 'px';
        tree.style.left = Math.floor(Math.random() * ((game.offsetWidth - gameArea.offsetWidth) / 2 - 100)) + 'px';
        tree.style.backgroundImage = treesCollection[Math.floor(Math.random() * 8)];
        game.appendChild(tree);
    }

    for (let i = 0; i < getQuantityElements(100); i++) {
        const tree2 = document.createElement('div');
        tree2.classList.add('tree2');
        tree2.y = 100 * i;
        tree2.style.top = (i * 100) + 'px';
        tree2.style.left = Math.floor(Math.random() * ((game.offsetWidth - gameArea.offsetWidth) / 2 - 100)) + gameArea.offsetWidth + (game.offsetWidth - gameArea.offsetWidth) / 2 + 'px';
        tree2.style.backgroundImage = treesCollection[Math.floor(Math.random() * 8)];
        game.appendChild(tree2);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.backgroundImage = enemyCar[Math.floor(Math.random() * 6)];
        gameArea.appendChild(enemy);
    }

    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2 + 'px';
    car.style.top = 'auto';
    car.style.bottom = '20px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    if (setting.start) {
        
        setting.score += setting.speed;
        score.innerHTML = "SCORE<br>" + setting.score + "<p style='font-size: 1rem'>Your record: " + setting.bestScore + "</p>";
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
            setting.x += setting.speed ;
        }
        if (keys.ArrowDown && setting.y < gameArea.offsetHeight - car.offsetHeight) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }  
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';  
        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -50;
        }
    });
    let trees = document.querySelectorAll('.tree');
    trees.forEach(function(tree) {
        tree.y += setting.speed;
        tree.style.top = tree.y + 'px';
        if (tree.y >= document.documentElement.clientHeight) {
            tree.y = -50;
            tree.style.left = Math.floor(Math.random() * ((game.offsetWidth - gameArea.offsetWidth) / 2 - 100)) + 'px';
            tree.style.backgroundImage = treesCollection[Math.floor(Math.random() * 8)];
        }
    });
    let trees2 = document.querySelectorAll('.tree2');
    trees2.forEach(function(tree2) {
        tree2.y += setting.speed;
        tree2.style.top = tree2.y + 'px';
        if (tree2.y >= document.documentElement.clientHeight) {
            tree2.y = -50;    
            tree2.style.left = Math.floor(Math.random() * ((game.offsetWidth - gameArea.offsetWidth) / 2 - 100)) + gameArea.offsetWidth + (game.offsetWidth - gameArea.offsetWidth) / 2 + 'px';
            tree2.style.backgroundImage = treesCollection[Math.floor(Math.random() * 8)];
        }
    });

}

function moveEnemy() {
    let enemys = document.querySelectorAll('.enemy');

    enemys.forEach(function(enemy) {
        let carRect = car.getBoundingClientRect(),
            enemyRect = enemy.getBoundingClientRect();
            
        if (carRect.top < enemyRect.bottom &&
            carRect.right > enemyRect.left &&
            carRect.left < enemyRect.right &&
            carRect.bottom > enemyRect.top) {
                setting.start = false;
                start.classList.remove('hide');
                start.style.height = 'auto';
                score.style.top = start.offsetHeight + 'px';
                if (setting.score > setting.bestScore) {
                    setting.bestScore = setting.score;
                }
        }
        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px';
        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * setting.traffic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px';
            enemy.style.backgroundImage = enemyCar[Math.floor(Math.random() * 6)];
        }
    });
}
