import { Howl } from "howler";

let bgMusic: Howl | null = null;
let _musicEnabled = false;

function getMusic(): Howl {
  if (!bgMusic) {
    bgMusic = new Howl({
      src: ["/audio/bg-music.mp3"],
      loop: true,
      volume: 0,
      html5: true,
      onloaderror: () => {
        console.warn(
          "[audio] Background music not found at /audio/bg-music.mp3 — " +
            "download a track from https://pixabay.com/music/search/cyberpunk%20ambient/ " +
            "and place it at public/audio/bg-music.mp3",
        );
      },
    });
  }
  return bgMusic;
}

export function startMusic() {
  const music = getMusic();
  _musicEnabled = true;
  music.play();
  music.fade(0, 0.25, 2000);
}

export function stopMusic() {
  if (!bgMusic) return;
  _musicEnabled = false;
  bgMusic.fade(bgMusic.volume(), 0, 800);
  setTimeout(() => {
    if (!_musicEnabled && bgMusic) {
      bgMusic.pause();
    }
  }, 850);
}

export function toggleMusic(): boolean {
  if (_musicEnabled) {
    stopMusic();
    return false;
  }
  startMusic();
  return true;
}

export function isMusicPlaying(): boolean {
  return _musicEnabled;
}
