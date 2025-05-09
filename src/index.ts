import { Login } from "./models/Credential";
import { Storage } from "./utils/Storage";

import { Chessboard } from "./models/Chessboard";

const session = Storage.loadFromSessionStorage('type-chess:session');
if (!session) window.location.href = "public/login.html";

const login = new Login();
document.querySelector('#logout')?.addEventListener('click', login.logout);

new Chessboard('chessboard')

const volUp = document.querySelector('.icon.on');
const volOff = document.querySelector('.icon.off');
const audio = document.getElementById('bg-audio') as HTMLAudioElement;

document.querySelector('.music')?.addEventListener('click', () => {
  volUp?.classList.toggle('hide');
  volOff?.classList.toggle('hide');

  if (audio) audio.muted = !audio.muted;
});
