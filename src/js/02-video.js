import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

initTime();

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  const { seconds } = data;
  localStorage.setItem(LOCALSTORAGE_KEY, seconds);
}

function initTime() {
  let savedTime = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedTime) {
    savedTime = JSON.parse(savedTime);
    player.setCurrentTime(savedTime);
  }
}
