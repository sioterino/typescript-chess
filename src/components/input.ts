import { newElement } from "../utils/DOM";

const input = (type: string, name: string, id: string, labelText: string): HTMLElement => {
  const input = newElement("input", {
    attr: {
      type,
      name,
      id,
      required: "true",
      autocomplete: "off",
      spellcheck: "false",
    },
  });

  const label = newElement("label", {
    text: labelText,
    attr: { for: id },
  });

  return newElement("div", {
    classes: "label-wrapper",
    children: [input, label],
  });
}

export { input }