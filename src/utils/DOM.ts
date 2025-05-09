class DOM {
    public static toggleBetweenLoginAndRegister() {
        const loginContainer = document.querySelector('.login.container');
        const registerContainer = document.querySelector('.register.container');
        
        loginContainer?.classList.toggle('hide');
        registerContainer?.classList.toggle('hide');
    
        loginContainer?.querySelector('form')?.reset();
        registerContainer?.querySelector('form')?.reset();
    }
    

    public static redirectToIndex(): void {
        window.location.href = "/";
    }
    
    public static redirectToLogin(): void {
        window.location.href = "/login.html";
    }

    public static popUp(text: string, warning: boolean = false): void {
        const popup: HTMLDivElement = document.createElement('div');
        popup.classList.add('popup');
    
        const p = document.createElement('p');
        p.textContent = text;
    
        const icon = document.createElement('span');
        icon.classList.add('icon');
    
        if (warning) {
            popup.classList.add('red');
            icon.textContent = "cancel";
        } else {
            popup.classList.add('green');
            icon.textContent = "check_circle";
        }
    
        popup.append(icon, p);

        this.showPopup(popup);
    }
    
    private static showPopup(popup: HTMLDivElement): void {
        const body: HTMLBodyElement = document.querySelector('body')!;
        body.appendChild(popup);
    
        // slight delay before showing (for css transitions to kick in)
        setTimeout(() => {
            popup.classList.add("popup-show");
    
            // wait 2s before starting to hide
            setTimeout(() => {
                popup.classList.remove("popup-show");
    
                // wait for css transition to finish before removing
                popup.addEventListener('transitionend', () => {
                    popup.remove();
                }, { once: true });
    
            }, 2000); // 2s before hiding element
    
        }, 200);// slight delay to ensure dom reflow
    }
    
    
}

export { DOM }