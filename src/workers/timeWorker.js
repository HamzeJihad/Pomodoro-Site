let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) return;

  isRunning = true;

  const state = event.data;

  console.log(`meu state`, state);
  const { activeTask, secondsRemaining } = state;



  const endDate = activeTask.startDate + secondsRemaining * 1000;

  let now = Date.now();

  let remaining = Math.ceil(Math.floor((endDate - now) / 1000));

  function tick() {
    self.postMessage(remaining);

    now = Date.now();

    remaining = Math.floor(Math.floor((endDate - now) / 1000));
    setTimeout(tick, 1000);
  }

  tick();
};
