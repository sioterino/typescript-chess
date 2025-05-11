import { DOM } from "../utils/DOM";

import { newElement } from "../utils/DOM";
import { input } from "./input";
import { submitButton } from "./submitButton";

const loginForm = (): HTMLDivElement => {
  const usernameInput = input("text", "username", "login-username", "Username");

  const passwordInput = input("password", "password", "login-password", "Password");

  const redirectText = newElement("p", {
    classes: "redirect",
    text: "Don't have an account yet? ",

    children: [
      newElement("span", {
        classes: "link",
        text: "Register",
        events: { click: () => DOM.toggleBetweenLoginAndRegister() },
      }),
    ],
    
  });

  const submit = submitButton("Log in");

  const form = newElement("form", {
    children: [usernameInput, passwordInput, redirectText, submit],
  });

  return newElement("div", {
    classes: ["login", "container"],
    children: [newElement("h3", { text: "Log in" }), form],
  });
};

export { loginForm };
