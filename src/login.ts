import { Login } from "./models/Credential";
import { Register } from "./models/Credential";
import { DOM } from "./utils/DOM";

document.querySelector('.login .link')?.addEventListener('click', DOM.toggleBetweenLoginAndRegister)
document.querySelector('.register .link')?.addEventListener('click', DOM.toggleBetweenLoginAndRegister)

new Login()
new Register()
