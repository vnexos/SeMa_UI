const webLocalStorage = {
  set(key: string, rawValue: any) {
    localStorage.setItem(key, JSON.stringify(rawValue));
  },

  get(key: string) {
    const rawData = localStorage.getItem(key) ?? "";
    const data = rawData ? JSON.parse(rawData) : null;

    return data;
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  removeAll() {
    Object.keys(localStorage).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};

export default webLocalStorage;
