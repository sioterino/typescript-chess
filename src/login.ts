import { Login } from "./models/Credential";
import { Register } from "./models/Credential";

import { loginForm } from "./components/loginForm";
import { registerForm } from "./components/registerForm";

const body = document.querySelector('body')!
body.append(loginForm(), registerForm())

new Login()
new Register()