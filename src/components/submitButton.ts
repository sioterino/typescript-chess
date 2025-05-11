import { newElement } from "../utils/DOM";

const submitButton = (text: string): HTMLButtonElement => {
  return newElement("button", {
    text,
    attr: { type: "submit" },
  });
}

export { submitButton }