import { newElement } from "../utils/DOM";

const icon = (classes: string | string[], icon: string) => {

    const classList = Array.isArray(classes) ? classes : classes.split(" ");

    return newElement('span', {
        classes: ['icon', ...classList],
        text: icon
    })

}

export { icon }