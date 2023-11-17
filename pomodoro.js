let pomodoro = document.querySelector('button.pomodoro');
let descanso = document.querySelector('button.descanso');
let timer = document.querySelector('h1');
let r;
let min;
let seg;
let tempo;

function notificar(nome, mensagem) {

  const options = {
    body: mensagem,
    icon: 'pomodoro-icon.png',
    requireInteraction: true
  }

  if ('Notification' in window) {

    if (Notification.permission === 'default') {
      Notification.requestPermission().then(r => {
        if (r === 'granted') {
          new Notification(nome, options);
        }
      })
    } else if (Notification.permission === 'granted') {

      new Notification(nome, options);

    } else {
      throw 'Notificações negadas.'
    }



  } else {
    console.error('O navegador não suporta Notificações')
  }

}


pomodoro.addEventListener('click', () => {
  r = 0;
  tempo = 1500;
  pomodoroTimer = setInterval(function () {
    if (r === 1) {
      clearInterval(pomodoroTimer);
      timer.innerText = "05:00";
    }
    min = parseInt(tempo / 60, 10);
    seg = parseInt(tempo % 60, 10);
    if (min < 10) {
      min = '0' + min.valueOf();
    }
    if (seg < 10) {
      seg = '0' + seg;
    }
    if (--tempo < 0) {
      notificar('Pomodoro', 'Hora de descansar!');
      clearInterval(pomodoroTimer);
      new Audio('/som.wav').play();
    }
    timer.innerText = `${min}:${seg}`;
  }, 1000);
});

descanso.addEventListener('click', () => {
  r = 1;
  tempo = 300;
  descansoTimer = setInterval(function () {
    if (r === 0) {
      clearInterval(descansoTimer);
      timer.innerText = "25:00";
    }
    min = parseInt(tempo / 60, 10);
    seg = parseInt(tempo % 60, 10);
    if (min < 10) {
      min = '0' + min.valueOf();
    }
    if (seg < 10) {
      seg = '0' + seg;
    }
    if (--tempo < 0) {
      clearInterval(descansoTimer);
      new Audio('/som.wav').play();
    }
    timer.innerText = `${min}:${seg}`;
  }, 1000);
});
