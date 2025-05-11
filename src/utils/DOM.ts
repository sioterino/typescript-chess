/**
 * A UTILITY CLASS FOR DOM MANIPULATIONS.
 */
class DOM {
  /**
   * TOGGLES THE VISIBILITY OF THE LOGIN AND REGISTER CONTAINERS.
   *
   * Resets the forms of both containers.
   *
   * This method is used for switching between the login and registration views.
   */
  public static toggleBetweenLoginAndRegister(): void {
    const loginContainer = document.querySelector(".login.container");
    const registerContainer = document.querySelector(".register.container");

    loginContainer?.classList.toggle("hide");
    registerContainer?.classList.toggle("hide");

    loginContainer?.querySelector("form")?.reset();
    registerContainer?.querySelector("form")?.reset();
  }

  /**
   * REDIRECTS THE USER TO THE INDEX PAGE (HOME PAGE).
   */
  public static redirectToIndex(): void {
    window.location.href = "/";
  }

  /**
   * REDIRECTS THE USER TO THE LOGIN PAGE.
   */
  public static redirectToLogin(): void {
    window.location.href = "/login.html";
  }

  /**
   * DISPLAYS A POP-UP MESSAGE WITH A TEXT
   *
   * Can gave an optional warning flag to indicate
   * whether the message is a warning (red color) or success (green color).
   *
   * @param {string} text - The message to display in the pop-up.
   * @param {boolean} [warning=false] - A flag to determine if the pop-up is a warning (true = red) or success (false = green).
   */
  public static popUp(text: string, warning: boolean = false): void {
    const popup: HTMLDivElement = document.createElement("div");
    popup.classList.add("popup");

    const p = document.createElement("p");
    p.textContent = text;

    const icon = document.createElement("span");
    icon.classList.add("icon");

    if (warning) {
      popup.classList.add("red");
      icon.textContent = "cancel";
    } else {
      popup.classList.add("green");
      icon.textContent = "check_circle";
    }

    popup.append(icon, p);

    this.showPopup(popup);
  }
  /**
   * TOGGLES MUSIC ON AND OFF
   *
   * @param {HTMLAudioElement} audio - Audio HTML Element meant muted/muted
   */
  public static toggleBackgroudMusic(audio: HTMLAudioElement) {
    const volUp = document.querySelector('.icon.on');
    const volOff = document.querySelector('.icon.off');
    volUp?.classList.toggle('hide');
    volOff?.classList.toggle('hide');

    if (audio) audio.muted = !audio.muted;
}

  /**
   * DISPLAYS THE PROVIDED POPUP ELEMENT IN THE DOM, ADDING THE NECESSARY ANIMATIONS AND DELAYS.
   *
   * @param {HTMLDivElement} popup - The popup element to display.
   */
  private static showPopup(popup: HTMLDivElement): void {
    const body: HTMLBodyElement = document.querySelector("body")!;
    body.appendChild(popup);

    // slight delay before showing (for css transitions to kick in)
    setTimeout(() => {
      popup.classList.add("popup-show");

      // wait 2s before starting to hide
      setTimeout(() => {
        popup.classList.remove("popup-show");

        // wait for css transition to finish before removing
        popup.addEventListener(
          "transitionend",
          () => {
            popup.remove();
          },
          { once: true }
        );
      }, 2000); // 2s before hiding element
    }, 200); // slight delay to ensure dom reflow
  }
}

/**
 * The shape of the options object used to configure the new HTML element.
 */
type Element = {
  /**
   * The classes to apply to the element.
   * Can be a single string or an array of strings.
   */
  classes?: string | string[];
  /**
   * The text content to set for the element.
   */
  text?: string;
  /**
   * The HTML to set for the element (dangerous, use cautiously).
   */
  html?: string;
  /**
   * Attributes to set on the element.
   * Each key-value pair represents an attribute and its value.
   */
  attr?: { [key: string]: string };
  /**
   * Children to append to the element.
   * Can be other HTMLElements or strings.
   */
  children?: HTMLElement[] | string[];
  /**
   * Event listeners to attach to the element.
   * Each key corresponds to an event type, and the value is the event handler function.
   */
  events?: {
    [K in keyof HTMLElementEventMap]?: (
      this: HTMLElement,
      ev: HTMLElementEventMap[K]
    ) => any;
  };
};


/**
 * A utility function to create and configure a new HTML element with options for classes, text, HTML, attributes, children, and event listeners.
 * 
 * @param {K} tag - The tag name of the element to create (e.g., 'div', 'span', 'p').
 * @param {Element} [options={}] - Options to configure the created element.
 * 
 * @returns {HTMLElementTagNameMap[K]} - The created and configured HTML element.
 */
function newElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: Element = {}
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (options.classes) {
    const classList = Array.isArray(options.classes)
      ? options.classes
      : options.classes.split(" ");
    element.classList.add(...classList);
  }

  if (options.text) {
    element.textContent = options.text;
  }

  if (options.html) {
    element.innerHTML = options.html;
  }

  if (options.attr) {
    for (const [key, value] of Object.entries(options.attr)) {
      element.setAttribute(key, value);
    }
  }

  if (options.children) {
    for (const child of options.children) {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
  }

  if (options.events) {
    for (const [event, handler] of Object.entries(options.events)) {
      if (handler) {
        element.addEventListener(event, handler as EventListener);
      }
    }
  }

  return element;
}

export { DOM, newElement };
