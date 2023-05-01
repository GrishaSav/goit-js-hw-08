import Vimeo from '@vimeo/player';
import _throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const player = new Vimeo('vimeo-player');

player.on('loaded', () => {
  const currentTime = localStorage.getItem(STORAGE_KEY);
  player.setCurrentTime(currentTime);
});

player.on(
  'timeupdate',
  _throttle(({ seconds }) => {
    localStorage.setItem(STORAGE_KEY, seconds);
  }, 1000)
);
