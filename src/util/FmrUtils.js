export default class FmrUtils {
    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static addParamToUri(uri, key, value) {
        if (!uri) {
            return '';
        }

        let uriParts = uri.split('?');

        if (uriParts.length > 1) {
            return uri + '&' + key + '=' + encodeURIComponent(value);
        } else {
            return uri + '?' + key + '=' + encodeURIComponent(value);
        }
    }
    
    static getExtention(fileName) {
        let a = fileName.split(".");
        if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
            return "";
        }
        return a.pop();
    }
}