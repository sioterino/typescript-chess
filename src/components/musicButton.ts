import { newElement } from "../utils/DOM";
import { icon } from "./icon";

const music = (on: boolean, toggleFn: () => void) => {
    const el = newElement('div', { classes: 'music' });
    const volOff = icon('off', 'volume_off');
    const volOn = icon('on', 'volume_up');

    on ? volOff.classList.add('hide') : volOn.classList.add('hide');

    el.addEventListener('click', toggleFn);

    el.append(volOn, volOff);
    return el;
};


export { music }