import { getCookie, getCookies, OptionsType, setCookie } from "cookies-next";
import _ from "lodash";

const webStorageServer = {
  async set(key: string, rawValue: any, option?: OptionsType) {
    const value = _.isString(rawValue) ? rawValue : JSON?.stringify(rawValue);

    await setCookie(key, value, { ...option, path: "/" });
  },

  async get(key: string) {
    const value: string = (await getCookie(key, { path: "/" })) ?? "";

    try {
      return JSON?.parse(value);
    } catch {
      return value;
    }
  },

  remove(key: string) {
    setCookie(key, null, { maxAge: 0 });
  },

  removeAll() {
    Object.keys(getCookies).forEach((cookieName) => {
      setCookie(cookieName, null, { maxAge: 0 });
    });
  },
};

export default webStorageServer;
