import storage from "good-storage"
import config from "./config"

class cache {
  constructor(key, session) {
    this.key = key;
    this.session = session ? true : false;
  }

  get() {
    if (this.session) {
      return storage.session.get(this.key, null);
    } else {
      return storage.get(this.key, null);
    }
  }

  set(value) {
    if (this.session) {
      storage.session.set(this.key, value);
    } else {
      storage.set(this.key, value);
    }
  }

  remove() {
    if (this.session) {
      storage.session.remove(this.key);
    } else {
      storage.remove(this.key);
    }
  }
}

let prefix = config.key_prefix + (window.version || "") + "_";

const TOKEN_CACHE_KEY = prefix + "token_"
export const tokenCache = new cache(TOKEN_CACHE_KEY)

const USER_CACHE_KEY = prefix + "user_"
export const userToken = new cache(USER_CACHE_KEY)
