/*
  File: js/app.js
  Deskripsi:
  - Menghubungkan logic timer dan audio ke UI HTML.
  - Menangani event listener tombol, status badge, dan indikator sesi.
  - File ini berperan sebagai inisialisasi utama aplikasi.
*/

(function () {
  const timerApi = window.PomodoroTimer;
  const audioApi = window.AmbientAudio;

  const elements = {
    timerDisplay: document.getElementById('timerDisplay'),
    modeBadge: document.getElementById('modeBadge'),
    sessionIndicator: document.getElementById('sessionIndicator'),
    sessionCounterText: document.getElementById('sessionCounterText'),
    statusText: document.getElementById('statusText'),
    modeButtons: document.querySelectorAll('.mode-btn'),
    ambientButtons: [],
    ambientButtonsList: document.getElementById('ambientButtonsList'),
    ambientToggleBtn: document.getElementById('ambientToggleBtn'),
    ambientToggleIcon: document.getElementById('ambientToggleIcon'),
    ambientToggleLabel: document.getElementById('ambientToggleLabel'),
    startBtn: document.getElementById('startBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resetBtn: document.getElementById('resetBtn'),
    volumeControl: document.getElementById('volumeControl'),
    volumeLabel: document.getElementById('volumeLabel'),
    audioStatusDot: document.getElementById('audioStatusDot'),
  };

  const SOUND_LIBRARY = {
    rain: {
      label: 'Hujan',
      src: [
        'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=0',
        'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=30',
        'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=60',
      ],
    },
    cafe: {
      label: 'Suara Kafe',
      src: [
        'https://www.youtube.com/embed/MYPVQccHhAQ?autoplay=1&mute=1&loop=1&playlist=MYPVQccHhAQ&controls=0&rel=0&playsinline=1&start=0',
         'https://www.youtube.com/embed/MYPVQccHhAQ?autoplay=1&mute=1&loop=1&playlist=MYPVQccHhAQ&controls=0&rel=0&playsinline=1&start=90',
        
      ],
    },
    campfire: {
      label: 'Api Unggun',
      src: 'assets/campfire.mp3',
    },
  };

  function renderSessionIndicator() {
    const completed = timerApi.getState().completedFocusSessions;
    const totalDots = 4;
    const visibleCompleted = completed % 4 === 0 && completed > 0 ? 4 : completed % 4;

    elements.sessionIndicator.innerHTML = '';

    for (let index = 0; index < totalDots; index += 1) {
      const dot = document.createElement('span');
      dot.className = `session-dot ${index < visibleCompleted ? 'finished' : ''}`;
      elements.sessionIndicator.appendChild(dot);
    }

    const cycleLabel = completed >= 4 ? (completed % 4 === 0 ? 4 : completed % 4) : completed;
    elements.sessionCounterText.textContent = `${cycleLabel} / 4`;
  }

  function renderTimerUI() {
    const state = timerApi.getState();
    const currentMode = state.currentModeConfig;

    elements.timerDisplay.textContent = state.remainingTimeText;
    elements.modeBadge.textContent = currentMode.label;

    elements.modeButtons.forEach((button) => {
      const isActive = button.dataset.mode === state.currentMode;
      button.classList.toggle('active', isActive);
    });

    const statusMessage = {
      focus: state.isRunning
        ? 'Waktu fokus sedang berjalan. Tetap pada satu tugas utama.'
        : 'Siap fokus. Mulai satu tugas dan jaga momentum.',
      shortBreak: state.isRunning
        ? 'Istirahat singkat aktif. Ambil napas dan relaksasi sejenak.'
        : 'Istirahat singkat siap. Beri otak Anda jeda cepat.',
      longBreak: state.isRunning
        ? 'Istirahat panjang aktif. Luangkan waktu untuk reset mental.'
        : 'Istirahat panjang siap. Ambil momentum baru dengan tenang.',
    };

    elements.statusText.textContent = statusMessage[state.currentMode] || 'Siap fokus.';
    renderSessionIndicator();
  }

  function renderAmbientButtons() {
    if (!elements.ambientButtonsList) {
      return;
    }

    const soundEntries = Object.entries(audioApi.SOUND_LIBRARY || {});
    const iconMap = {
      rain: '☔',
      cafe: '☕',
      campfire: '🔥',
      forest: '🌲',
      persia: '🌴',
      library: '📚',
    };

    elements.ambientButtonsList.innerHTML = '';

    soundEntries.forEach(([soundKey, sound]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ambient-btn';
      button.dataset.sound = soundKey;
      button.innerHTML = `
        <span>${iconMap[soundKey] || '🎧'}</span>
        <span>${sound.label}</span>
      `;

      button.addEventListener('click', () => {
        audioApi.toggleSound(soundKey);
        renderAudioUI();
      });

      elements.ambientButtonsList.appendChild(button);
    });

    elements.ambientButtons = Array.from(elements.ambientButtonsList.querySelectorAll('.ambient-btn'));
  }

  function renderAudioUI() {
    const state = audioApi.getState();
    const volumePercent = Math.round(state.volume * 100);

    elements.volumeControl.value = volumePercent;
    elements.volumeLabel.textContent = `${volumePercent}%`;

    elements.ambientButtons = Array.from(elements.ambientButtonsList.querySelectorAll('.ambient-btn'));
    elements.ambientButtons.forEach((button) => {
      const isActive = button.dataset.sound === state.activeSound && state.isPlaying;
      button.classList.toggle('active', isActive);
    });

    if (state.isPlaying) {
      elements.ambientToggleIcon.textContent = '🔊';
      elements.ambientToggleLabel.textContent = `Suara Aktif: ${audioApi.SOUND_LIBRARY[state.activeSound]?.label || 'Hujan'}`;
      elements.ambientToggleBtn.classList.remove('muted');
    } else {
      elements.ambientToggleIcon.textContent = '🔇';
      elements.ambientToggleLabel.textContent = 'Suara Mati';
      elements.ambientToggleBtn.classList.add('muted');
    }

    const dotColor = state.isPlaying ? 'rgba(52, 211, 153, 1)' : 'rgba(248, 250, 252, 0.4)';
    elements.audioStatusDot.style.background = dotColor;
    elements.audioStatusDot.style.boxShadow = state.isPlaying
      ? '0 0 12px rgba(52, 211, 153, 0.8)'
      : 'none';
  }

  function attachTimerEvents() {
    elements.startBtn.addEventListener('click', () => {
      timerApi.startTimer();
      renderTimerUI();
    });

    elements.pauseBtn.addEventListener('click', () => {
      timerApi.pauseTimer();
      renderTimerUI();
    });

    elements.resetBtn.addEventListener('click', () => {
      timerApi.resetTimer();
      renderTimerUI();
    });

    elements.modeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        timerApi.setMode(button.dataset.mode, true);
        renderTimerUI();
      });
    });
  } 

  function attachAudioEvents() {
    elements.volumeControl.addEventListener('input', (event) => {
      const value = Number(event.target.value);
      audioApi.setVolume(value);
      renderAudioUI();
    });

    elements.ambientToggleBtn.addEventListener('click', () => {
      const state = audioApi.getState();

      if (state.isPlaying) {
        audioApi.pauseSound();
      } else {
        audioApi.playSound(state.activeSound || 'rain');
      }

      renderAudioUI();
    });

  }

  function initialize() {
    renderAmbientButtons();
    timerApi.subscribe(renderTimerUI);
    audioApi.subscribe(renderAudioUI);

    window.addEventListener('pomodoro:phase-complete', (event) => {
      const detail = event.detail || {};
      const nextModeLabel = timerApi.getState().currentModeConfig.label;

      elements.statusText.textContent =
        detail.type === 'focus-complete'
          ? `Sesi fokus selesai! Anda sudah mencapai ${detail.completedFocusSessions} sesi. Selamat beristirahat.`
          : `Istirahat selesai. Saatnya kembali ke mode ${nextModeLabel.toLowerCase()}.`;

      audioApi.playCompletionTone();
    });

    attachTimerEvents();
    attachAudioEvents();

    audioApi.setVolume(50);

    renderTimerUI();
    renderAudioUI();
  }

  initialize();
})();
