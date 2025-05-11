import { DOM } from "../utils/DOM";

import { newElement } from "../utils/DOM";
import { input } from "./input";
import { submitButton } from "./submitButton";

function registerForm(): HTMLDivElement {
  const usernameInput = input("text", "username", "register-username", "Username");

  const passwordInput = input("password", "password", "register-password", "Password");

  const redirectText = newElement("p", {
    classes: "redirect",
    text: "Already have an account? ",

    children: [
      newElement("span", {
        classes: "link",
        text: "Log in",
        events: { click: () => DOM.toggleBetweenLoginAndRegister() },
      }),
    ],
    
  });

  const submit = submitButton("Register");

  const form = newElement("form", {
    children: [usernameInput, passwordInput, redirectText, submit],
  });

  return newElement("div", {
    classes: ["register", "container", "hide"],
    children: [newElement("h3", { text: "Register" }), form],
  });
}

export { registerForm };
