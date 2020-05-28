export default class StorageUtils {
  static save (name, value) {
    if (typeof(value) !== 'undefined') {
      window.localStorage.setItem(name, JSON.stringify(value));
    }
  }

  static saveString(name, value) {
    if (typeof(value) !== 'undefined') {
      window.localStorage.setItem(name, value);
    }
  }

  static get (name) {
    let jsonStr = window.localStorage.getItem(name);
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
    return null;
  }

  static getString(name) {
    return window.localStorage.getItem(name);
  }

  static delete (name) {
    window.localStorage.removeItem(name);
  }

  static deleteAll () {
    window.localStorage.clear();
  }
}
