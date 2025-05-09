import { Login } from "./models/Credential";
import { Storage } from "./utils/Storage";

import { Chessboard } from "./models/Chessboard";

const session = Storage.loadFromSessionStorage('type-chess:session');
if (!session) window.location.href = "public/login.html";

const login = new Login();
document.querySelector('#logout')?.addEventListener('click', login.logout);

new Chessboard('chessboard')
