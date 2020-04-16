export default class StorageUtils {
  static get (name) {
    let value = window.sessionStorage.getItem(name);
    if (value) {
      return value;
    }
    return null;
  }

  static saveToSession (name, value) {
    if (typeof(value) !== 'undefined') {
      window.sessionStorage.setItem(name, JSON.stringify(value));
    }
  }

  static getFromSession (name) {
    let jsonStr = window.sessionStorage.getItem(name);
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
    return null;
  }

  static deleteFromSession (name) {
    window.sessionStorage.removeItem(name);
  }

  static deleteAll () {
    window.sessionStorage.clear();
  }
}
