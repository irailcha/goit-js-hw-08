// // Додай бібліотеку як залежність проекту через npm.
import VimeoPlayer from '@vimeo/player';
// // Додай до проекту бібліотеку lodash.throttle
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

// // Ініціалізуй плеєр у файлі скрипта як це описано в
// //  секції pre - existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
const iframe = document.querySelector('iframe');
    const player = new VimeoPlayer(iframe);

player.on('timeupdate', throttle((data) => {
  localStorage.setItem(LOCALSTORAGE_KEY , data.seconds);
}, 1000));

player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

player.ready().then(() => {
  const currentTime = localStorage.getItem(LOCALSTORAGE_KEY );
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
});



