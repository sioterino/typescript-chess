import { Storage } from "./Storage";
import type { UserCredential } from "../models/Credential";

class IdGenerator {
  private static ids: Set<string> = new Set();

  public static createId(): string {
    this.loadIdsFromStorage();

    let id: string;
    do {
      id = (Date.now() + Math.floor(Math.random() * 1000)).toString();
    } while (this.ids.has(id));

    this.ids.add(id);
    return id;
  }

  private static loadIdsFromStorage(): void {
    if (this.ids.size > 0) return;

    const users = Storage.loadFromLocalStorage <UserCredential> ('type-chess:users')
    users?.forEach(user => this.ids.add(user.id))

  }
}

export { IdGenerator };
