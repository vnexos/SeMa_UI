import { getCookie, getCookies, setCookie } from "cookies-next/client";
import _ from "lodash";

const webStorageClient = {
  set(key: string, rawValue: any, option?: any) {
    const value = _.isString(rawValue) ? rawValue : JSON?.stringify(rawValue);

    setCookie(key, value, option);
  },

  get(key: string) {
    const value: string = getCookie(key, { path: "/" }) ?? "";

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
      setCookie(cookieName, undefined);
    });
  },
};

export default webStorageClient;
