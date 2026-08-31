/*
  File: js/timer.js
  Deskripsi:
  - Menyimpan semua logika timer pomodoro.
  - Mengatur mode focus, short break, dan long break.
  - Timer dikelola dengan interval JavaScript agar aplikasi ringan dan cepat.
*/

(function () {
  const MODES = {
    focus: { label: 'Focus', duration: 25 * 60 },
    shortBreak: { label: 'Short Break', duration: 5 * 60 },
    longBreak: { label: 'Long Break', duration: 15 * 60 },
  };

  const state = {
    currentMode: 'focus',
    remainingSeconds: MODES.focus.duration,
    isRunning: false,
    intervalId: null,
    completedFocusSessions: 0,
    listeners: [],
  };

  function notify() {
    state.listeners.forEach((listener) => listener({ ...state }));
  }

  function getModeConfig(mode) {
    return MODES[mode] || MODES.focus;
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function setMode(mode, shouldReset = true) {
    const nextMode = getModeConfig(mode);
    state.currentMode = mode;

    if (shouldReset) {
      state.remainingSeconds = nextMode.duration;
    }

    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
      state.isRunning = false;
    }

    notify();
  }

  function startTimer() {
    if (state.isRunning) {
      return;
    }

    state.isRunning = true;
    state.intervalId = setInterval(() => {
      if (state.remainingSeconds > 0) {
        state.remainingSeconds -= 1;
      }

      if (state.remainingSeconds <= 0) {
        clearInterval(state.intervalId);
        state.intervalId = null;
        state.isRunning = false;
        finishCurrentPhase();
        return;
      }

      notify();
    }, 1000);

    notify();
  }

  function pauseTimer() {
    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }

    state.isRunning = false;
    notify();
  }

  function resetTimer() {
    pauseTimer();
    state.remainingSeconds = getModeConfig(state.currentMode).duration;
    notify();
  }

  function finishCurrentPhase() {
    const completedData =
      state.currentMode === 'focus'
        ? (() => {
            state.completedFocusSessions += 1;
            const nextMode = state.completedFocusSessions % 4 === 0 ? 'longBreak' : 'shortBreak';
            const payload = {
              type: 'focus-complete',
              completedFocusSessions: state.completedFocusSessions,
              nextMode,
            };

            window.dispatchEvent(new CustomEvent('pomodoro:phase-complete', { detail: payload }));
            setMode(nextMode, true);
            return payload;
          })()
        : (() => {
            const payload = {
              type: 'break-complete',
              nextMode: 'focus',
            };

            window.dispatchEvent(new CustomEvent('pomodoro:phase-complete', { detail: payload }));
            setMode('focus', true);
            return payload;
          })();

    return completedData;
  }

  function subscribe(listener) {
    state.listeners.push(listener);
    return () => {
      state.listeners = state.listeners.filter((item) => item !== listener);
    };
  }

  function getState() {
    return {
      ...state,
      remainingTimeText: formatTime(state.remainingSeconds),
      currentModeConfig: getModeConfig(state.currentMode),
      currentModeLabel: getModeConfig(state.currentMode).label,
    };
  }

  function getCompletedFocusRounds() {
    return state.completedFocusSessions;
  }

  window.PomodoroTimer = {
    MODES,
    startTimer,
    pauseTimer,
    resetTimer,
    setMode,
    formatTime,
    subscribe,
    getState,
    getCompletedFocusRounds,
  };
})();
