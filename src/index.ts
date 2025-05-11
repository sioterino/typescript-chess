import { Login } from "./models/Credential";
import { Storage } from "./utils/Storage";
import { DOM } from "./utils/DOM";

import { Chessboard } from "./models/Chessboard";

import { canvas } from "./components/canvas";
import { music } from "./components/musicButton";
import { audio } from "./components/audio";

const session = Storage.loadFromSessionStorage('type-chess:session');
if (!session) window.location.href = "public/login.html";

const login = new Login();
document.querySelector('#logout')?.addEventListener('click', login.logout);


// ADDING COMPONENTS TO HTML
const body = document.querySelector('body')!
body.append( canvas )

const MUSIC_ONLOAD = false
const audioEl = audio(MUSIC_ONLOAD, '/src/assets/sound/ost.mp3')
const musicEl = music(MUSIC_ONLOAD, () => DOM.toggleBackgroudMusic(audioEl))
body.append( musicEl, audioEl )

// ADDING FUNCTIONALITY TO HTML
new Chessboard('chessboard')


