class Storage {
  public static loadFromLocalStorage<T>(key: string): T[] | null {
    const raw = localStorage.getItem(key);
    const data = raw ? (JSON.parse(raw) as T[]) : null;
    return data;
  }

  public static loadFromSessionStorage<T>(key: string): T[] | null {
    const raw = sessionStorage.getItem(key);
    const data = raw ? (JSON.parse(raw) as T[]) : null;
    return data;
  }

  public static saveToLocalStorage<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public static saveToSessionStorage<T>(key: string, data: T) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  public static encode(str: string): string {
    return btoa(str);
  }

  private static ids = new Set();

  public static createId() {
    let id;

    do {
      id = Date.now() + Math.floor(Math.random() * 1000);
    } while (this.ids.has(id));

    this.ids.add(id);
    return id;
  }
}

export { Storage };
