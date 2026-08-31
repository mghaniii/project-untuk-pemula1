/*
  File: js/audio.js
  Deskripsi:
  - Mengelola suara latar ambient tanpa bergantung pada tautan eksternal.
  - Audio dibuat menggunakan Web Audio API agar bisa berjalan langsung dari file HTML.
  - Ini cocok untuk kebutuhan offline, tanpa install npm, tanpa CORS issue.
*/

(function () {
  const YT_BASE_URLS = {
    rain: [
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=0',
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=30',
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=60',
    ],
    cafe: [
      'https://www.youtube.com/embed/MYPVQccHhAQ?autoplay=1&mute=1&loop=1&playlist=MYPVQccHhAQ&controls=0&rel=0&playsinline=1&start=0',
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=90',
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=120',
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=150',
    ],

     persia: [
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=0',
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=120',
      'https://www.youtube.com/embed/Pb6oXRDIMlQ?autoplay=1&mute=1&loop=1&playlist=Pb6oXRDIMlQ&controls=0&rel=0&playsinline=1&start=150',
    ],

    japan: [
      'https://www.youtube.com/embed/KX01ScyA52E?autoplay=1&mute=1&loop=1&playlist=KX01ScyA52E&controls=0&rel=0&playsinline=1&start=0',
    ],
    library: [
      'https://www.youtube.com/embed/D9km3yXmR8k?autoplay=1&mute=1&loop=1&playlist=D9km3yXmR8k&controls=0&rel=0&playsinline=1&start=0',
    ]
  };

  function isYouTubeSource(src) {
    return typeof src === 'string' && src.includes('youtube.com');
  }

  function getSoundSourceList(soundKey) {
    const sound = SOUND_LIBRARY[soundKey];
    if (!sound) {
      return [];
    }

    if (Array.isArray(sound.src)) {
      return sound.src.filter((item) => typeof item === 'string' && item.trim() !== '');
    }

    if (typeof sound.src === 'string' && sound.src.trim() !== '') {
      return [sound.src];
    }

    return [];
  }

  function getNextSourceFor(soundKey) {
    const sources = getSoundSourceList(soundKey);
    if (sources.length === 0) {
      return '';
    }

    const currentIndex = state.sourceIndex[soundKey] || 0;
    const selected = sources[currentIndex % sources.length];
    state.sourceIndex[soundKey] = (currentIndex + 1) % sources.length;
    return selected;
  }

  function getCurrentSourceFor(soundKey) {
    const sources = getSoundSourceList(soundKey);
    if (sources.length === 0) {
      return '';
    }

    const currentIndex = state.sourceIndex[soundKey] || 0;
    return sources[(currentIndex - 1 + sources.length) % sources.length];
  }

  const SOUND_LIBRARY = {
    rain: { label: 'Hujan', src: 'assets/liecio-calming-rain-257596.mp3' },
    cafe: { label: 'Kafe', src: YT_BASE_URLS.cafe },
    campfire: { label: 'Api Unggun', src: 'assets/campfire.mp3' },
    
    library: { label: 'Perpustakaan', src: YT_BASE_URLS.library },
    persia: { label: 'Persia vibe ', src: YT_BASE_URLS.persia },
    japan: { label: 'Jepang vibe', src: YT_BASE_URLS.japan },
  };

  const state = {
    activeSound: 'rain',
    isPlaying: false,
    volume: 0.5,
    listeners: [],
    audioContext: null,
    masterGainNode: null,
    currentNode: null,
    audioMap: {},
    sourceIndex: {},
  };

  function notify() {
    state.listeners.forEach((listener) => listener({ ...state }));
  }

  function ensureAudioContext() {
    if (!state.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        return null;
      }

      state.audioContext = new AudioCtx();
      state.masterGainNode = state.audioContext.createGain();
      state.masterGainNode.gain.value = state.volume;
      state.masterGainNode.connect(state.audioContext.destination);
    }

    return state.audioContext;
  }

  function createNoiseBuffer() {
    const bufferLength = state.audioContext.sampleRate * 2;
    const buffer = state.audioContext.createBuffer(1, bufferLength, state.audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferLength; i += 1) {
      output[i] = (Math.random() * 2 - 1) * 0.5;
    }

    return buffer;
  }

  function createRainSound() {
    const context = ensureAudioContext();
    if (!context || !state.masterGainNode) {
      return null;
    }

    const noiseSource = context.createBufferSource();
    noiseSource.buffer = createNoiseBuffer();
    noiseSource.loop = true;

    const lowpass = context.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 1200;

    const gain = context.createGain();
    gain.gain.value = 0.14;

    noiseSource.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(state.masterGainNode);

    noiseSource.start();
    return noiseSource;
  }

  function createCafeSound() {
    const context = ensureAudioContext();
    if (!context || !state.masterGainNode) {
      return null;
    }

    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 180;

    const lfo = context.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.3;

    const lfoGain = context.createGain();
    lfoGain.gain.value = 18;

    const gain = context.createGain();
    gain.gain.value = 0.05;

    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    oscillator.connect(gain);
    gain.connect(state.masterGainNode);

    oscillator.start();
    lfo.start();

    return { oscillator, lfo, gain };
  }

  function createCampfireSound() {
    const context = ensureAudioContext();
    if (!context || !state.masterGainNode) {
      return null;
    }

    const noiseSource = context.createBufferSource();
    noiseSource.buffer = createNoiseBuffer();
    noiseSource.loop = true;

    const lowpass = context.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 500;

    const gain = context.createGain();
    gain.gain.value = 0.18;

    const fireOsc = context.createOscillator();
    fireOsc.type = 'triangle';
    fireOsc.frequency.value = 110;

    const modulationGain = context.createGain();
    modulationGain.gain.value = 30;

    const fireGain = context.createGain();
    fireGain.gain.value = 0.04;

    const lfo = context.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.5;

    lfo.connect(modulationGain);
    modulationGain.connect(fireOsc.frequency);

    noiseSource.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(state.masterGainNode);

    fireOsc.connect(fireGain);
    fireGain.connect(state.masterGainNode);

    noiseSource.start();
    fireOsc.start();
    lfo.start();

    return { noiseSource, fireOsc, lfo, gain, fireGain };
  }

  function createAudioElement(soundKey) {
    const sound = SOUND_LIBRARY[soundKey];
    if (!sound || !sound.src) {
      return null;
    }

    if (!state.audioMap[soundKey]) {
      const audio = new Audio(sound.src);
      audio.loop = true;
      audio.volume = state.volume;
      audio.preload = 'auto';
      audio.onerror = () => {
        // Jangan menggantikan file audio asli dengan suara sintetis.
        // Ini agar suara angin/hujan yang "tertukar" tidak terdengar lagi.
        if (state.activeSound === soundKey) {
          state.audioMap[soundKey] = null;
          state.currentNode = null;
          state.isPlaying = false;
          notify();
        }
      };
      state.audioMap[soundKey] = audio;
    }

    return state.audioMap[soundKey];
  }

  function stopCurrentNode() {
    if (state.currentNode && typeof state.currentNode.pause === 'function') {
      state.currentNode.pause();
      state.currentNode.currentTime = 0;
    }

    if (state.currentNode && state.currentNode.tagName === 'IFRAME') {
      state.currentNode.src = '';
    }

    if (!state.currentNode) {
      return;
    }

    if (typeof state.currentNode.stop === 'function') {
      try {
        state.currentNode.stop();
      } catch (error) {
        // Node mungkin sudah berhenti sebelumnya, jadi abaikan error ini.
      }
    }

    if (typeof state.currentNode.disconnect === 'function') {
      state.currentNode.disconnect();
    }

    if (state.currentNode.oscillator && typeof state.currentNode.oscillator.stop === 'function') {
      try {
        state.currentNode.oscillator.stop();
      } catch (error) {
        // Abaikan jika node sudah dihentikan.
      }
    }

    if (state.currentNode.lfo && typeof state.currentNode.lfo.stop === 'function') {
      try {
        state.currentNode.lfo.stop();
      } catch (error) {
        // Abaikan jika node sudah dihentikan.
      }
    }

    if (state.currentNode.noiseSource && typeof state.currentNode.noiseSource.stop === 'function') {
      try {
        state.currentNode.noiseSource.stop();
      } catch (error) {
        // Abaikan jika node sudah dihentikan.
      }
    }

    state.currentNode = null;
  }

  function applyVideoMuteState() {
    const player = document.getElementById('ambientPlayer');
    if (!player || !state.activeSound || !SOUND_LIBRARY[state.activeSound]) {
      return;
    }

    const source = getCurrentSourceFor(state.activeSound);
    if (!isYouTubeSource(source)) {
      return;
    }

    const url = new URL(source);
    url.searchParams.set('autoplay', '1');
    url.searchParams.set('loop', '1');
    url.searchParams.set('controls', '0');
    url.searchParams.set('rel', '0');
    url.searchParams.set('playsinline', '1');
    url.searchParams.set('mute', state.volume <= 0.01 ? '1' : '0');

    if (state.isPlaying) {
      player.src = url.toString();
    }
  }

  function applyCurrentVolume() {
    if (state.currentNode && typeof state.currentNode.volume === 'number') {
      state.currentNode.volume = state.volume;
    }

    // Untuk YouTube iframe, browser tidak memungkinkan mengubah volume tanpa reload iframe.
    // Jadi jangan set ulang src saat slider volume dipindah, supaya audio tidak restart dari awal.
    if (state.currentNode && state.currentNode.tagName === 'IFRAME') {
      return;
    }
  }

  function setVolume(value) {
    const normalized = Math.min(1, Math.max(0, value / 100));
    state.volume = normalized;

    if (state.masterGainNode) {
      state.masterGainNode.gain.value = normalized;
    }

    applyCurrentVolume();

    notify();
  }

  function playSoundFallback(soundKey) {
    const context = ensureAudioContext();
    if (!context) {
      state.isPlaying = false;
      notify();
      return;
    }

    if (soundKey === 'rain') {
      state.currentNode = createRainSound();
    } else if (soundKey === 'cafe') {
      state.currentNode = createCafeSound();
    } else if (soundKey === 'campfire') {
      state.currentNode = createCampfireSound();
    }

    if (state.currentNode) {
      state.isPlaying = true;
      if (context.state === 'suspended') {
        context.resume().catch(() => {
          state.isPlaying = false;
          notify();
        });
      }
    } else {
      state.isPlaying = false;
    }

    notify();
  }

  function playSound(soundKey) {
    const sound = SOUND_LIBRARY[soundKey];
    if (!sound) {
      return;
    }

    state.activeSound = soundKey;
    stopCurrentNode();

    const selectedSource = getNextSourceFor(soundKey);
    const source = selectedSource || (Array.isArray(sound.src) ? sound.src[0] : sound.src);

    if (isYouTubeSource(source)) {
      const player = document.getElementById('ambientPlayer');
      if (player) {
        const url = new URL(source);
        url.searchParams.set('autoplay', '1');
        url.searchParams.set('loop', '1');
        url.searchParams.set('controls', '0');
        url.searchParams.set('rel', '0');
        url.searchParams.set('playsinline', '1');
        url.searchParams.set('mute', state.volume <= 0.01 ? '1' : '0');
        player.src = url.toString();
        state.currentNode = player;
        state.isPlaying = true;
        notify();
        return;
      }
    }

    if (typeof source === 'string' && source.trim() !== '') {
      const audio = createAudioElement(soundKey);
      if (audio) {
        audio.src = source;
        audio.volume = state.volume;
        audio.play().catch(() => {
          state.isPlaying = false;
          state.audioMap[soundKey] = null;
          state.currentNode = null;
          notify();
          return;
        });
        state.currentNode = audio;
        state.isPlaying = true;
        notify();
        return;
      }
    }

    state.isPlaying = false;
    notify();
  }

  function pauseSound() {
    stopCurrentNode();
    const player = document.getElementById('ambientPlayer');
    if (player) {
      player.src = '';
    }
    state.isPlaying = false;
    notify();
  }

  function playCompletionTone() {
    const context = ensureAudioContext();
    if (!context) {
      return;
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(660, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.18);

    gainNode.gain.setValueAtTime(0.0001, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(state.volume || 0.5, context.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.4);

    oscillator.connect(gainNode);
    gainNode.connect(state.masterGainNode || context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.45);
  }

  function toggleSound(soundKey) {
    if (state.activeSound === soundKey && state.isPlaying) {
      pauseSound();
      return;
    }

    playSound(soundKey);
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
      activeLabel: SOUND_LIBRARY[state.activeSound]?.label || 'Hujan',
    };
  }

  window.AmbientAudio = {
    SOUND_LIBRARY,
    playSound,
    pauseSound,
    toggleSound,
    setVolume,
    playCompletionTone,
    subscribe,
    getState,
  };
})();
