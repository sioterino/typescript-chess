import { Storage } from "../utils/Storage";
import { IdGenerator } from "../utils/IdGenerator";
import { DOM } from "../utils/DOM";

import bcrypt from "bcryptjs";

type UserCredential = {
  id: string;
  username: string;
  password: string;
  darkMode: boolean;
};

class Credential {
  protected data: UserCredential;

  public constructor() {
    this.data = { id: "", username: "", password: "", darkMode: false };
  }

  protected formSubmit(e: Event, callback: Function): void {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = new FormData(form);

    input.forEach((value, key) => {
      if (key in this.data) {
        (this.data as any)[key] = (value as string).trim();
      }
    });

    form.reset();
    callback();
  }

  protected verifyIfUserExists(username: string): boolean {
    const users = this.getUsersData();
    if (!users) return false;

    return users.some((u) => u.username === username);
  }

  protected verifyPassword(username: string, password: string) {
    const user = this.getUser("username", username);
    if (!user) {
      return false;
    }

    return bcrypt.compare(password, user.password)
  }

  protected getUsersData(): UserCredential[] | null {
    return Storage.loadFromLocalStorage<UserCredential>("type-chess:users");
  }

  protected getUser(key: keyof UserCredential, value: string): UserCredential | null {
    const users = this.getUsersData();
    if (!users) return null;

    return users.find((user) => user[key] === value) || null;
  }
}

class Login extends Credential {
  public constructor() {
    super();
    document
      .querySelector(".login form")
      ?.addEventListener("submit", (e) => this.formSubmit(e, this.login));
  }

  private login = async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const isValid = await this.verifyPassword(this.data.username, this.data.password);
    
    if (!isValid) {
      DOM.popUp('Login credentials incorrect', true);
      return;
    }
    
    const user = this.getUser("username", this.data.username);
    Storage.saveToSessionStorage("type-chess:session", user);

    DOM.redirectToIndex();
  };
  

  public logout = (): void => {
    sessionStorage.removeItem("type-chess:session");
    DOM.redirectToLogin()
  }
}

class Register extends Credential {
  public constructor() {
    super();
    document
      .querySelector(".register form")
      ?.addEventListener("submit", (e) => this.formSubmit(e, this.register));
  }

  private register = async (): Promise<void> => {
    if (this.verifyIfUserExists(this.data.username)) {
      DOM.popUp('Username already taken', true)
      return;
    }

    const users = this.getUsersData() ?? [];

    users.push({
      id: IdGenerator.createId(),
      username: this.data.username,
      password: await bcrypt.hash(this.data.password, 10),
      darkMode: false,
    });

    Storage.saveToLocalStorage("type-chess:users", users);
    DOM.popUp('User registered successfully')

    DOM.toggleBetweenLoginAndRegister()
  };
}

export { Login, Register };
export type { UserCredential };
