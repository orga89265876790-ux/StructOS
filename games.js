const gameStage = document.querySelector('[data-game-stage]');
const gameButtons = [...document.querySelectorAll('[data-game-card]')];

if (gameStage && gameButtons.length) {
  let disposeGame = () => {};
  let currentGame = '';

  const ui = {
    score: 'Счёт', lines: 'Линии', restart: 'Начать заново', newGame: 'Новая игра',
    snakeHelp: 'Стрелки на клавиатуре или кнопки. 10 очков — победа и бонус +10 ₽ один раз в день.',
    tetrisHelp: 'Собирайте заполненные линии. Фигуру можно двигать и поворачивать.',
    minesHelp: 'Откройте все безопасные клетки. Режим флага удобен на телефоне.',
    pokerHelp: 'Выберите карты для замены. Соперник — компьютер.',
    futurePoker: 'В будущем здесь можно будет играть с пользователями StructOS на бонусы.',
    chessHelp: 'Полноценные ходы фигур, шах и мат. Рокировка и взятие на проходе пока не используются.',
    checkersHelp: 'Русские шашки: обязательное взятие, дамки и несколько взятий за ход.',
    backgammonHelp: 'Короткие нарды для двух игроков на одном устройстве: бросьте кости и выберите шашку.',
    youWin: 'Победа!', gameOver: 'Игра окончена', yourTurn: 'Ваш ход', computerTurn: 'Ход компьютера',
    replace: 'Заменить выбранные', reveal: 'Открыть карты', deal: 'Раздать заново', flag: 'Флаг', open: 'Открывать',
    white: 'Белые', black: 'Чёрные', move: 'Ход', roll: 'Бросить кости', bar: 'Бар', borneOff: 'Снято'
  };

  function gameShell(title, help, body, stats = '') {
    return `<section class="structos-game"><header class="game-head"><div><h2>${title}</h2><p>${help}</p></div>${stats ? `<div class="game-stats">${stats}</div>` : ''}</header>${body}</section>`;
  }

  function stopCurrentGame() {
    disposeGame();
    disposeGame = () => {};
  }

  function launchGame(name) {
    stopCurrentGame();
    currentGame = name;
    gameButtons.forEach((button) => button.classList.toggle('is-selected', button.dataset.gameCard === name));
    const games = { snake: renderSnake, tetris: renderTetris, mines: renderMines, poker: renderPoker, chess: renderChess, checkers: renderCheckers, backgammon: renderBackgammon };
    games[name]?.();
  }

  gameButtons.forEach((button) => button.addEventListener('click', () => launchGame(button.dataset.gameCard)));
  window.addEventListener('structos:games-visible', () => { if (currentGame) launchGame(currentGame); });
  new MutationObserver(() => {
    if (gameStage.closest('[data-panel="games"]')?.hidden) stopCurrentGame();
  }).observe(gameStage.closest('[data-panel="games"]'), { attributes: true, attributeFilter: ['hidden'] });

  function renderSnake() {
    gameStage.innerHTML = gameShell('Змейка', ui.snakeHelp, '<canvas class="game-canvas" data-snake width="320" height="320" aria-label="Игровое поле змейки"></canvas><p class="game-message" data-game-message></p><div class="game-controls"><span></span><button type="button" data-snake-dir="up">↑</button><span></span><button type="button" data-snake-dir="left">←</button><button type="button" data-snake-dir="down">↓</button><button type="button" data-snake-dir="right">→</button><button class="is-wide" type="button" data-game-restart>${ui.restart}</button></div>', '<span><small>Счёт</small><b data-game-score>0 / 10</b></span>');
    const canvas = gameStage.querySelector('[data-snake]');
    const context = canvas.getContext('2d');
    const scoreNode = gameStage.querySelector('[data-game-score]');
    const message = gameStage.querySelector('[data-game-message]');
    const size = 16;
    const cells = canvas.width / size;
    let snake;
    let direction;
    let pendingDirection;
    let food;
    let score;
    let timer;
    let stopped;

    const randomFood = () => {
      let next;
      do { next = { x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells) }; }
      while (snake.some((part) => part.x === next.x && part.y === next.y));
      return next;
    };
    const paint = () => {
      context.fillStyle = '#031127'; context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = 'rgba(74,154,230,.08)'; context.lineWidth = 1;
      for (let index = 0; index <= cells; index += 1) { context.beginPath(); context.moveTo(index * size, 0); context.lineTo(index * size, canvas.height); context.stroke(); context.beginPath(); context.moveTo(0, index * size); context.lineTo(canvas.width, index * size); context.stroke(); }
      context.fillStyle = '#ff6d82'; context.shadowColor = '#ff4565'; context.shadowBlur = 12; context.beginPath(); context.arc(food.x * size + size / 2, food.y * size + size / 2, size * .34, 0, Math.PI * 2); context.fill();
      snake.forEach((part, index) => { context.fillStyle = index ? '#28c995' : '#69efbf'; context.shadowColor = '#42e9b5'; context.shadowBlur = index ? 3 : 12; context.fillRect(part.x * size + 1.5, part.y * size + 1.5, size - 3, size - 3); });
      context.shadowBlur = 0;
    };
    const setDirection = (next) => {
      const vectors = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
      const vector = vectors[next];
      if (vector && !(vector.x === -direction.x && vector.y === -direction.y)) pendingDirection = vector;
    };
    const end = (won) => {
      stopped = true; clearInterval(timer);
      message.textContent = won ? `${ui.youWin} +10 ₽` : ui.gameOver;
      if (won) window.dispatchEvent(new CustomEvent('structos:game-reward', { detail: { game: 'snake' } }));
    };
    const tick = () => {
      if (stopped || document.hidden) return;
      direction = pendingDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      if (head.x < 0 || head.y < 0 || head.x >= cells || head.y >= cells || snake.some((part) => part.x === head.x && part.y === head.y)) { end(false); return; }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 1; scoreNode.textContent = `${score} / 10`; food = randomFood();
        if (score >= 10) { paint(); end(true); return; }
      } else snake.pop();
      paint();
    };
    const reset = () => {
      clearInterval(timer); snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]; direction = { x: 1, y: 0 }; pendingDirection = direction; score = 0; stopped = false; food = randomFood(); scoreNode.textContent = '0 / 10'; message.textContent = ''; paint(); timer = setInterval(tick, 125);
    };
    const keyHandler = (event) => { const names = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }; if (names[event.key]) { event.preventDefault(); setDirection(names[event.key]); } };
    document.addEventListener('keydown', keyHandler);
    gameStage.querySelectorAll('[data-snake-dir]').forEach((button) => button.addEventListener('pointerdown', () => setDirection(button.dataset.snakeDir)));
    gameStage.querySelector('[data-game-restart]').addEventListener('click', reset);
    let touchStart = null;
    canvas.addEventListener('pointerdown', (event) => { touchStart = { x: event.clientX, y: event.clientY }; });
    canvas.addEventListener('pointerup', (event) => { if (!touchStart) return; const dx = event.clientX - touchStart.x; const dy = event.clientY - touchStart.y; if (Math.max(Math.abs(dx), Math.abs(dy)) > 18) setDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up')); touchStart = null; });
    reset();
    disposeGame = () => { clearInterval(timer); document.removeEventListener('keydown', keyHandler); };
  }

  function renderTetris() {
    gameStage.innerHTML = gameShell('Тетрис', ui.tetrisHelp, '<canvas class="game-canvas" data-tetris width="240" height="480" aria-label="Игровое поле тетриса"></canvas><p class="game-message" data-game-message></p><div class="game-controls"><button type="button" data-tetris-action="left">←</button><button type="button" data-tetris-action="rotate">↻</button><button type="button" data-tetris-action="right">→</button><button type="button" data-tetris-action="down">↓</button><button class="is-wide" type="button" data-game-restart>${ui.restart}</button></div>', '<span><small>Счёт</small><b data-game-score>0</b></span><span><small>Линии</small><b data-game-lines>0</b></span>');
    const canvas = gameStage.querySelector('[data-tetris]'); const ctx = canvas.getContext('2d');
    const width = 10; const height = 20; const block = 24;
    const shapes = [
      [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]], [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]], [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]]
    ];
    const colors = ['#43d9ff','#ffe06c','#ae7dff','#5e94ff','#ff9a5f','#58e59e','#ff687e'];
    let board; let piece; let timer; let score; let lines; let over;
    const collision = (candidate, ox = candidate.x, oy = candidate.y, matrix = candidate.matrix) => matrix.some((row, y) => row.some((value, x) => value && (ox + x < 0 || ox + x >= width || oy + y >= height || (oy + y >= 0 && board[oy + y][ox + x]))));
    const rotate = (matrix) => matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
    const spawn = () => { const kind = Math.floor(Math.random() * shapes.length); piece = { matrix: shapes[kind].map((row) => [...row]), color: kind + 1, x: 3, y: -1 }; if (collision(piece)) { over = true; clearInterval(timer); gameStage.querySelector('[data-game-message]').textContent = ui.gameOver; } };
    const clearLines = () => { let cleared = 0; for (let y = height - 1; y >= 0; y -= 1) { if (board[y].every(Boolean)) { board.splice(y, 1); board.unshift(Array(width).fill(0)); cleared += 1; y += 1; } } if (cleared) { lines += cleared; score += [0,100,300,500,800][cleared]; gameStage.querySelector('[data-game-lines]').textContent = lines; gameStage.querySelector('[data-game-score]').textContent = score; } };
    const lock = () => { piece.matrix.forEach((row, y) => row.forEach((value, x) => { if (value && piece.y + y >= 0) board[piece.y + y][piece.x + x] = piece.color; })); clearLines(); spawn(); };
    const drop = () => { if (over || document.hidden) return; if (!collision(piece, piece.x, piece.y + 1)) piece.y += 1; else lock(); draw(); };
    const drawCell = (x, y, color) => { ctx.fillStyle = colors[color - 1]; ctx.shadowColor = colors[color - 1]; ctx.shadowBlur = 5; ctx.fillRect(x * block + 1, y * block + 1, block - 2, block - 2); ctx.strokeStyle = 'rgba(255,255,255,.28)'; ctx.strokeRect(x * block + 2, y * block + 2, block - 4, block - 4); };
    const draw = () => { ctx.fillStyle = '#031127'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.strokeStyle = 'rgba(80,160,235,.09)'; for (let x=0;x<=width;x+=1){ctx.beginPath();ctx.moveTo(x*block,0);ctx.lineTo(x*block,canvas.height);ctx.stroke();} for(let y=0;y<=height;y+=1){ctx.beginPath();ctx.moveTo(0,y*block);ctx.lineTo(canvas.width,y*block);ctx.stroke();} board.forEach((row,y)=>row.forEach((value,x)=>{if(value)drawCell(x,y,value);})); piece?.matrix.forEach((row,y)=>row.forEach((value,x)=>{if(value&&piece.y+y>=0)drawCell(piece.x+x,piece.y+y,piece.color);})); ctx.shadowBlur=0; };
    const action = (name) => { if (over) return; if (name === 'left' && !collision(piece,piece.x-1,piece.y)) piece.x -= 1; if (name === 'right' && !collision(piece,piece.x+1,piece.y)) piece.x += 1; if (name === 'down') drop(); if (name === 'rotate') { const next=rotate(piece.matrix); if(!collision(piece,piece.x,piece.y,next))piece.matrix=next; } draw(); };
    const reset = () => { clearInterval(timer); board=Array.from({length:height},()=>Array(width).fill(0)); score=0; lines=0; over=false; gameStage.querySelector('[data-game-score]').textContent='0';gameStage.querySelector('[data-game-lines]').textContent='0';gameStage.querySelector('[data-game-message]').textContent='';spawn();draw();timer=setInterval(drop,520); };
    const keyHandler = (event) => { const actions={ArrowLeft:'left',ArrowRight:'right',ArrowDown:'down',ArrowUp:'rotate',' ':'rotate'};if(actions[event.key]){event.preventDefault();action(actions[event.key]);} };
    document.addEventListener('keydown',keyHandler); gameStage.querySelectorAll('[data-tetris-action]').forEach((button)=>button.addEventListener('click',()=>action(button.dataset.tetrisAction))); gameStage.querySelector('[data-game-restart]').addEventListener('click',reset); reset();
    disposeGame=()=>{clearInterval(timer);document.removeEventListener('keydown',keyHandler);};
  }

  function renderMines() {
    gameStage.innerHTML = gameShell('Взрыватель', ui.minesHelp, '<div class="mine-board" data-mine-board role="grid"></div><p class="game-message" data-game-message></p><div class="game-controls"><button class="is-wide" type="button" data-mine-mode>⚑ Флаг: выкл.</button><button class="is-wide" type="button" data-game-restart>Новая игра</button></div>', '<span><small>Мины</small><b>10</b></span><span><small>Открыто</small><b data-game-score>0 / 71</b></span>');
    const boardNode=gameStage.querySelector('[data-mine-board]'); const message=gameStage.querySelector('[data-game-message]'); let cells;let placed;let ended;let flagMode;
    const neighbors=(index)=>{const row=Math.floor(index/9),col=index%9,out=[];for(let dy=-1;dy<=1;dy+=1)for(let dx=-1;dx<=1;dx+=1){const y=row+dy,x=col+dx;if((dx||dy)&&y>=0&&y<9&&x>=0&&x<9)out.push(y*9+x);}return out;};
    const placeMines=(safe)=>{const excluded=new Set([safe,...neighbors(safe)]);let count=0;while(count<10){const index=Math.floor(Math.random()*81);if(!excluded.has(index)&&!cells[index].mine){cells[index].mine=true;count+=1;}}cells.forEach((cell,index)=>{cell.count=neighbors(index).filter((next)=>cells[next].mine).length;});placed=true;};
    const render=()=>{boardNode.innerHTML=cells.map((cell,index)=>`<button class="mine-cell${cell.open?' is-open':''}${cell.mine&&cell.open?' is-mine':''}${cell.flag?' is-flag':''}" type="button" role="gridcell" data-mine-cell="${index}" data-count="${cell.open?cell.count:''}" aria-label="Клетка ${index+1}">${cell.flag?'⚑':cell.open?(cell.mine?'✹':cell.count||''):''}</button>`).join('');gameStage.querySelector('[data-game-score]').textContent=`${cells.filter((cell)=>cell.open&&!cell.mine).length} / 71`;};
    const reveal=(index)=>{const cell=cells[index];if(cell.open||cell.flag||ended)return;if(!placed)placeMines(index);cell.open=true;if(cell.mine){ended=true;cells.forEach((item)=>{if(item.mine)item.open=true;});message.textContent=ui.gameOver;render();return;}if(!cell.count)neighbors(index).forEach(reveal);if(cells.filter((item)=>item.open&&!item.mine).length===71){ended=true;message.textContent=ui.youWin;}render();};
    const choose=(index,event)=>{if(ended)return;if(flagMode||event?.type==='contextmenu'){cells[index].flag=!cells[index].flag;render();return;}reveal(index);};
    const reset=()=>{cells=Array.from({length:81},()=>({mine:false,count:0,open:false,flag:false}));placed=false;ended=false;flagMode=false;message.textContent='';gameStage.querySelector('[data-mine-mode]').textContent='⚑ Флаг: выкл.';render();};
    boardNode.addEventListener('click',(event)=>{const button=event.target.closest('[data-mine-cell]');if(button)choose(Number(button.dataset.mineCell),event);});boardNode.addEventListener('contextmenu',(event)=>{const button=event.target.closest('[data-mine-cell]');if(button){event.preventDefault();choose(Number(button.dataset.mineCell),event);}});gameStage.querySelector('[data-mine-mode]').addEventListener('click',(event)=>{flagMode=!flagMode;event.currentTarget.textContent=`⚑ Флаг: ${flagMode?'вкл.':'выкл.'}`;});gameStage.querySelector('[data-game-restart]').addEventListener('click',reset);reset();
  }

  function renderPoker() {
    gameStage.innerHTML=gameShell('Покер',ui.pokerHelp,'<div class="poker-table"><div><p class="game-note">Компьютер</p><div class="poker-hand" data-poker-computer></div></div><p class="game-message" data-game-message></p><div><div class="poker-hand" data-poker-player></div><p class="game-note">Ваши карты</p></div><div class="poker-controls"><button class="game-action" type="button" data-poker-draw>Заменить выбранные</button><button class="game-action" type="button" data-game-restart>Раздать заново</button></div></div><p class="game-note">'+ui.futurePoker+'</p>');
    const suits=['♠','♥','♦','♣'];const ranks=[2,3,4,5,6,7,8,9,10,11,12,13,14];const rankName=(rank)=>({11:'J',12:'Q',13:'K',14:'A'}[rank]||rank);let deck;let player;let computer;let selected;let finished;
    const shuffle=(items)=>{for(let i=items.length-1;i>0;i-=1){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;};
    const handValue=(hand)=>{const rs=hand.map((card)=>card.rank).sort((a,b)=>b-a);const counts={};rs.forEach((rank)=>{counts[rank]=(counts[rank]||0)+1;});const groups=Object.entries(counts).map(([rank,count])=>[count,Number(rank)]).sort((a,b)=>b[0]-a[0]||b[1]-a[1]);const flush=hand.every((card)=>card.suit===hand[0].suit);const unique=[...new Set(rs)];let straight=unique.length===5&&unique[0]-unique[4]===4?unique[0]:0;if(JSON.stringify(unique)==='[14,5,4,3,2]')straight=5;if(straight&&flush)return[8,straight];if(groups[0][0]===4)return[7,groups[0][1],groups[1][1]];if(groups[0][0]===3&&groups[1][0]===2)return[6,groups[0][1],groups[1][1]];if(flush)return[5,...rs];if(straight)return[4,straight];if(groups[0][0]===3)return[3,groups[0][1],...groups.slice(1).map((g)=>g[1]).sort((a,b)=>b-a)];if(groups[0][0]===2&&groups[1][0]===2)return[2,Math.max(groups[0][1],groups[1][1]),Math.min(groups[0][1],groups[1][1]),groups[2][1]];if(groups[0][0]===2)return[1,groups[0][1],...groups.slice(1).map((g)=>g[1]).sort((a,b)=>b-a)];return[0,...rs];};
    const category=['Старшая карта','Пара','Две пары','Сет','Стрит','Флеш','Фул-хаус','Каре','Стрит-флеш'];const compare=(a,b)=>{const av=handValue(a),bv=handValue(b);for(let i=0;i<Math.max(av.length,bv.length);i+=1){if((av[i]||0)!==(bv[i]||0))return(av[i]||0)-(bv[i]||0);}return 0;};
    const cardMarkup=(card,index,hidden=false)=>`<button class="playing-card${card.suit==='♥'||card.suit==='♦'?' is-red':''}${selected.has(index)?' is-held':''}${hidden?' is-hidden':''}" type="button" data-poker-card="${index}" ${hidden?'disabled':''}><span>${hidden?'StructOS':rankName(card.rank)}</span><small>${hidden?'◆':card.suit}</small></button>`;
    const render=()=>{gameStage.querySelector('[data-poker-player]').innerHTML=player.map((card,index)=>cardMarkup(card,index)).join('');gameStage.querySelector('[data-poker-computer]').innerHTML=computer.map((card,index)=>cardMarkup(card,index,!finished)).join('');};
    const reset=()=>{deck=shuffle(suits.flatMap((suit)=>ranks.map((rank)=>({suit,rank}))));player=deck.splice(0,5);computer=deck.splice(0,5);selected=new Set();finished=false;gameStage.querySelector('[data-game-message]').textContent='Выберите карты, которые хотите заменить.';gameStage.querySelector('[data-poker-draw]').disabled=false;render();};
    const finish=()=>{selected.forEach((index)=>{player[index]=deck.pop();});const counts={};computer.forEach((card)=>{counts[card.rank]=(counts[card.rank]||0)+1;});computer=computer.map((card)=>counts[card.rank]>=2||card.rank>=13?card:deck.pop());finished=true;selected.clear();const result=compare(player,computer);const pv=handValue(player),cv=handValue(computer);gameStage.querySelector('[data-game-message]').textContent=`${result>0?'Вы выиграли':result<0?'Компьютер выиграл':'Ничья'} · ${category[pv[0]]} / ${category[cv[0]]}`;gameStage.querySelector('[data-poker-draw]').disabled=true;render();};
    gameStage.querySelector('[data-poker-player]').addEventListener('click',(event)=>{const card=event.target.closest('[data-poker-card]');if(!card||finished)return;const index=Number(card.dataset.pokerCard);selected.has(index)?selected.delete(index):selected.add(index);render();});gameStage.querySelector('[data-poker-draw]').addEventListener('click',finish);gameStage.querySelector('[data-game-restart]').addEventListener('click',reset);reset();
  }

  function renderChess() {
    gameStage.innerHTML=gameShell('Шахматы',ui.chessHelp,'<div class="board-game" data-chess-board role="grid"></div><p class="game-message" data-game-message></p><button class="game-action" type="button" data-game-restart>Новая партия</button>','<span><small>Ход</small><b data-game-turn>Белые</b></span>');
    const node=gameStage.querySelector('[data-chess-board]');const icons={wK:'♔',wQ:'♕',wR:'♖',wB:'♗',wN:'♘',wP:'♙',bK:'♚',bQ:'♛',bR:'♜',bB:'♝',bN:'♞',bP:'♟'};let board;let turn;let selected;let ended;
    const inside=(r,c)=>r>=0&&r<8&&c>=0&&c<8;const color=(piece)=>piece?.[0];const type=(piece)=>piece?.[1];
    const pathClear=(from,to,state)=>{const dr=Math.sign(to[0]-from[0]),dc=Math.sign(to[1]-from[1]);let r=from[0]+dr,c=from[1]+dc;while(r!==to[0]||c!==to[1]){if(state[r][c])return false;r+=dr;c+=dc;}return true;};
    const pseudoLegal=(from,to,state,attacks=false)=>{const [r,c]=from,[nr,nc]=to;const piece=state[r]?.[c];if(!piece||!inside(nr,nc)||(color(state[nr][nc])===color(piece)))return false;const dr=nr-r,dc=nc-c,absR=Math.abs(dr),absC=Math.abs(dc),kind=type(piece);if(kind==='P'){const dir=color(piece)==='w'?-1:1;if(attacks)return dr===dir&&absC===1;if(dc===0&&!state[nr][nc]&&(dr===dir||(dr===dir*2&&r===(color(piece)==='w'?6:1)&&!state[r+dir][c])))return true;return dr===dir&&absC===1&&Boolean(state[nr][nc]);}if(kind==='N')return(absR===2&&absC===1)||(absR===1&&absC===2);if(kind==='K')return Math.max(absR,absC)===1;if(kind==='B')return absR===absC&&pathClear(from,to,state);if(kind==='R')return(dr===0||dc===0)&&pathClear(from,to,state);if(kind==='Q')return((absR===absC)||(dr===0||dc===0))&&pathClear(from,to,state);return false;};
    const attacked=(state,r,c,by)=>state.some((row,rr)=>row.some((piece,cc)=>color(piece)===by&&pseudoLegal([rr,cc],[r,c],state,true)));const findKing=(state,side)=>{for(let r=0;r<8;r+=1)for(let c=0;c<8;c+=1)if(state[r][c]===`${side}K`)return[r,c];return null;};
    const legal=(from,to,state=board,side=turn)=>{if(!pseudoLegal(from,to,state)||state[to[0]][to[1]]===`${side==='w'?'b':'w'}K`)return false;const copy=state.map((row)=>[...row]);copy[to[0]][to[1]]=copy[from[0]][from[1]];copy[from[0]][from[1]]=null;const king=findKing(copy,side);return king&&!attacked(copy,king[0],king[1],side==='w'?'b':'w');};
    const targets=(from)=>{const out=[];for(let r=0;r<8;r+=1)for(let c=0;c<8;c+=1)if(legal(from,[r,c]))out.push(`${r}:${c}`);return out;};
    const hasMove=(side)=>{for(let r=0;r<8;r+=1)for(let c=0;c<8;c+=1)if(color(board[r][c])===side){const old=turn;turn=side;const possible=targets([r,c]).length;turn=old;if(possible)return true;}return false;};
    const render=()=>{const possible=selected?new Set(targets(selected)):new Set();node.innerHTML=board.flatMap((row,r)=>row.map((piece,c)=>`<button class="board-square${(r+c)%2?' is-dark':''}${selected?.[0]===r&&selected?.[1]===c?' is-selected':''}${possible.has(`${r}:${c}`)?' is-target':''}" type="button" data-square="${r}:${c}" role="gridcell">${icons[piece]||''}</button>`)).join('');gameStage.querySelector('[data-game-turn]').textContent=turn==='w'?'Белые':'Чёрные';};
    const choose=(r,c)=>{if(ended)return;const piece=board[r][c];if(selected&&legal(selected,[r,c])){const moving=board[selected[0]][selected[1]];board[r][c]=moving;board[selected[0]][selected[1]]=null;if(type(moving)==='P'&&(r===0||r===7))board[r][c]=`${turn}Q`;turn=turn==='w'?'b':'w';selected=null;const king=findKing(board,turn);const inCheck=attacked(board,king[0],king[1],turn==='w'?'b':'w');if(!hasMove(turn)){ended=true;gameStage.querySelector('[data-game-message]').textContent=inCheck?`Мат. ${turn==='w'?'Чёрные':'Белые'} победили.`:'Пат. Ничья.';}else gameStage.querySelector('[data-game-message]').textContent=inCheck?'Шах.':'';render();return;}selected=color(piece)===turn?[r,c]:null;render();};
    const reset=()=>{board=[['bR','bN','bB','bQ','bK','bB','bN','bR'],Array(8).fill('bP'),...Array.from({length:4},()=>Array(8).fill(null)),Array(8).fill('wP'),['wR','wN','wB','wQ','wK','wB','wN','wR']];turn='w';selected=null;ended=false;gameStage.querySelector('[data-game-message]').textContent='';render();};
    node.addEventListener('click',(event)=>{const square=event.target.closest('[data-square]');if(square)choose(...square.dataset.square.split(':').map(Number));});gameStage.querySelector('[data-game-restart]').addEventListener('click',reset);reset();
  }

  function renderCheckers() {
    gameStage.innerHTML=gameShell('Шашки',ui.checkersHelp,'<div class="board-game" data-checkers-board role="grid"></div><p class="game-message" data-game-message></p><button class="game-action" type="button" data-game-restart>Новая партия</button>','<span><small>Ход</small><b data-game-turn>Белые</b></span>');
    const node=gameStage.querySelector('[data-checkers-board]');let board;let turn;let selected;let chain;let ended;
    const inside=(r,c)=>r>=0&&r<8&&c>=0&&c<8;const side=(piece)=>Math.sign(piece);const diagonals=[[-1,-1],[-1,1],[1,-1],[1,1]];
    const movesFrom=(r,c,captureOnly=false)=>{const piece=board[r][c];if(!piece)return[];const moves=[];if(Math.abs(piece)===2){for(const[dr,dc]of diagonals){let nr=r+dr,nc=c+dc,captured=null;while(inside(nr,nc)){const occupant=board[nr][nc];if(occupant){if(side(occupant)===side(piece)||captured)break;captured=[nr,nc];}else if(captured)moves.push({r:nr,c:nc,capture:captured});else if(!captureOnly)moves.push({r:nr,c:nc,capture:null});nr+=dr;nc+=dc;}}}else{const forward=piece>0?-1:1;if(!captureOnly){for(const dc of[-1,1]){const nr=r+forward,nc=c+dc;if(inside(nr,nc)&&!board[nr][nc])moves.push({r:nr,c:nc,capture:null});}}for(const[dr,dc]of diagonals){const nr=r+dr,nc=c+dc,jr=r+dr*2,jc=c+dc*2;if(inside(jr,jc)&&side(board[nr][nc])===-side(piece)&&!board[jr][jc])moves.push({r:jr,c:jc,capture:[nr,nc]});}}return captureOnly?moves.filter((move)=>move.capture):moves;};
    const anyCaptures=()=>{for(let r=0;r<8;r+=1)for(let c=0;c<8;c+=1)if(side(board[r][c])===turn&&movesFrom(r,c,true).length)return true;return false;};
    const available=(r,c)=>{if(side(board[r][c])!==turn)return[];const forced=anyCaptures();return movesFrom(r,c,forced);};
    const playerHasMove=()=>{for(let r=0;r<8;r+=1)for(let c=0;c<8;c+=1)if(side(board[r][c])===turn&&available(r,c).length)return true;return false;};
    const render=()=>{const possible=selected?new Set(available(...selected).map((move)=>`${move.r}:${move.c}`)):new Set();node.innerHTML=board.flatMap((row,r)=>row.map((piece,c)=>`<button class="board-square${(r+c)%2?' is-dark':''}${selected?.[0]===r&&selected?.[1]===c?' is-selected':''}${possible.has(`${r}:${c}`)?' is-target':''}" type="button" data-square="${r}:${c}">${piece?`<i class="checker-piece${piece<0?' is-black':''}${Math.abs(piece)===2?' is-king':''}"></i>`:''}</button>`)).join('');gameStage.querySelector('[data-game-turn]').textContent=turn>0?'Белые':'Чёрные';};
    const choose=(r,c)=>{if(ended)return;if(selected){const move=available(...selected).find((item)=>item.r===r&&item.c===c);if(move){let piece=board[selected[0]][selected[1]];board[selected[0]][selected[1]]=0;board[r][c]=piece;if(move.capture)board[move.capture[0]][move.capture[1]]=0;if((piece===1&&r===0)||(piece===-1&&r===7)){piece*=2;board[r][c]=piece;}if(move.capture&&movesFrom(r,c,true).length){selected=[r,c];chain=true;render();return;}turn*=-1;selected=null;chain=false;if(!playerHasMove()){ended=true;gameStage.querySelector('[data-game-message]').textContent=`${ui.youWin} ${turn>0?'Чёрные':'Белые'}.`;}render();return;}}if(chain)return;selected=side(board[r][c])===turn?[r,c]:null;render();};
    const reset=()=>{board=Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=>(r+c)%2?(r<3?-1:r>4?1:0):0));turn=1;selected=null;chain=false;ended=false;gameStage.querySelector('[data-game-message]').textContent='';render();};
    node.addEventListener('click',(event)=>{const square=event.target.closest('[data-square]');if(square)choose(...square.dataset.square.split(':').map(Number));});gameStage.querySelector('[data-game-restart]').addEventListener('click',reset);reset();
  }

  function renderBackgammon() {
    gameStage.innerHTML=gameShell('Нарды',ui.backgammonHelp,'<div class="backgammon-board"><div class="backgammon-half is-top" data-bg-top></div><div class="backgammon-dice" data-bg-dice></div><div class="backgammon-half is-bottom" data-bg-bottom></div></div><p class="game-message" data-game-message></p><div class="poker-controls"><button class="game-action" type="button" data-bg-bar>Бар: 0</button><button class="game-action" type="button" data-bg-bear>Снять шашку</button><button class="game-action" type="button" data-bg-roll>Бросить кости</button><button class="game-action" type="button" data-game-restart>Новая партия</button></div>','<span><small>Ход</small><b data-game-turn>Белые</b></span><span><small>Снято</small><b data-bg-off>0 / 0</b></span>');
    let points;let turn;let dice;let selected;let bar;let off;let ended;let skipTimer;
    const own=(value)=>Math.sign(value)===turn;const allHome=()=>{if(bar[turn])return false;for(let i=0;i<24;i+=1)if(own(points[i])&&(turn===1?i>5:i<18))return false;return true;};
    const targetFor=(source,die)=>{if(source==='bar')return turn===1?24-die:die-1;return source+(turn===1?-die:die);};
    const canBear=(source,die)=>{if(!allHome())return false;const target=targetFor(source,die);if(target>=0&&target<24)return false;if(turn===1){if(die===source+1)return true;return die>source+1&&!points.some((value,index)=>own(value)&&index>source);}if(die===24-source)return true;return die>24-source&&!points.some((value,index)=>own(value)&&index<source);};
    const valid=(source,die)=>{if(bar[turn]>0&&source!=='bar')return false;if(source==='bar'&&bar[turn]<=0)return false;if(source!=='bar'&&!own(points[source]))return false;const target=targetFor(source,die);if(target<0||target>23)return source!=='bar'&&canBear(source,die);return Math.sign(points[target])!==-turn||Math.abs(points[target])<2;};
    const possibleSources=()=>{const sources=bar[turn]>0?['bar']:points.map((_,index)=>index).filter((index)=>own(points[index]));return sources.filter((source)=>dice.some((die)=>valid(source,die)));};
    const targets=()=>selected===null?[]:[...new Set(dice.filter((die)=>valid(selected,die)).map((die)=>targetFor(selected,die)).filter((target)=>target>=0&&target<24))];
    const chipMarkup=(count,sideValue)=>count?`<span class="backgammon-chip${sideValue<0?' is-black':''}">${count}</span>`:'';
    const pointMarkup=(index)=>`<button class="backgammon-point${selected===index?' is-selected':''}${targets().includes(index)?' is-target':''}" type="button" data-bg-point="${index}">${chipMarkup(Math.abs(points[index]),points[index])}</button>`;
    const render=()=>{gameStage.querySelector('[data-bg-top]').innerHTML=[...Array(12)].map((_,offset)=>pointMarkup(12+offset)).join('');gameStage.querySelector('[data-bg-bottom]').innerHTML=[...Array(12)].map((_,offset)=>pointMarkup(11-offset)).join('');gameStage.querySelector('[data-bg-dice]').innerHTML=dice.length?dice.map((die)=>`<span>${die}</span>`).join(''):'<small>Бросьте кости</small>';gameStage.querySelector('[data-game-turn]').textContent=turn===1?'Белые':'Чёрные';gameStage.querySelector('[data-bg-off]').textContent=`${off[1]} / ${off[-1]}`;const barButton=gameStage.querySelector('[data-bg-bar]');barButton.textContent=`Бар: ${bar[turn]}`;barButton.classList.toggle('is-target',selected==='bar');const bearButton=gameStage.querySelector('[data-bg-bear]');bearButton.disabled=typeof selected!=='number'||!dice.some((die)=>canBear(selected,die));};
    const nextTurn=()=>{turn*=-1;dice=[];selected=null;gameStage.querySelector('[data-game-message]').textContent='';render();};
    const move=(source,target)=>{const dieIndex=dice.findIndex((die)=>valid(source,die)&&targetFor(source,die)===target);if(dieIndex<0)return;if(source==='bar')bar[turn]-=1;else points[source]-=turn;if(target<0||target>23)off[turn]+=1;else{if(Math.sign(points[target])===-turn&&Math.abs(points[target])===1){bar[-turn]+=1;points[target]=0;}points[target]+=turn;}dice.splice(dieIndex,1);selected=null;if(off[turn]>=15){ended=true;gameStage.querySelector('[data-game-message]').textContent=`${ui.youWin} ${turn===1?'Белые':'Чёрные'}.`;dice=[];render();return;}if(!dice.length)nextTurn();else if(!possibleSources().length){gameStage.querySelector('[data-game-message]').textContent='Нет доступных ходов.';skipTimer=setTimeout(nextTurn,700);}else render();};
    const choose=(point)=>{if(ended||!dice.length)return;if(selected!==null){if(targets().includes(point)){move(selected,point);return;}}selected=own(points[point])&&dice.some((die)=>valid(point,die))?point:null;render();};
    const roll=()=>{if(ended||dice.length)return;const a=1+Math.floor(Math.random()*6),b=1+Math.floor(Math.random()*6);dice=a===b?[a,a,a,a]:[a,b];selected=null;if(!possibleSources().length){gameStage.querySelector('[data-game-message]').textContent='Нет доступных ходов.';skipTimer=setTimeout(nextTurn,700);}render();};
    const reset=()=>{clearTimeout(skipTimer);points=Array(24).fill(0);points[23]=2;points[12]=5;points[7]=3;points[5]=5;points[0]=-2;points[11]=-5;points[16]=-3;points[18]=-5;turn=1;dice=[];selected=null;bar={1:0,'-1':0};off={1:0,'-1':0};ended=false;gameStage.querySelector('[data-game-message]').textContent='';render();};
    gameStage.querySelector('.backgammon-board').addEventListener('click',(event)=>{const point=event.target.closest('[data-bg-point]');if(point)choose(Number(point.dataset.bgPoint));});gameStage.querySelector('[data-bg-bar]').addEventListener('click',()=>{if(bar[turn]&&dice.some((die)=>valid('bar',die))){selected='bar';render();}});gameStage.querySelector('[data-bg-bear]').addEventListener('click',()=>{if(typeof selected!=='number')return;const die=dice.find((value)=>canBear(selected,value));if(die)move(selected,targetFor(selected,die));});gameStage.querySelector('[data-bg-roll]').addEventListener('click',roll);gameStage.querySelector('[data-game-restart]').addEventListener('click',reset);reset();disposeGame=()=>clearTimeout(skipTimer);
  }
}
