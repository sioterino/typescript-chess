import { newElement } from "../utils/DOM";

const audio = (on: boolean, src: string): HTMLAudioElement => {
    const source = newElement('source', {
        attr: {
            type: 'audio/mpeg',
            src: src
        }
    });

    const el = newElement('audio', {
        html: 'Your browser does not support the audio element.',
        children: [source],
        attr: {
            id: 'bg-audio',
            loop: '',
            autoplay: ''
        }
    }) as HTMLAudioElement;

    if (!on) {
        el.muted = true;
    }

    return el;
}


export { audio }