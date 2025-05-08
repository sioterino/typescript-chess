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
}

export { DOM }