export default class StorageUtils {
  static save (name, value) {
    if (typeof(value) !== 'undefined') {
      window.sessionStorage.setItem(name, JSON.stringify(value));
    }
  }

  static get (name) {
    let jsonStr = window.sessionStorage.getItem(name);
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
    return null;
  }

  static delete (name) {
    window.sessionStorage.removeItem(name);
  }

  static deleteAll () {
    window.sessionStorage.clear();
  }
}
