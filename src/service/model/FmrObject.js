export default class FmrObject {
    static isEqual (o1, o2) {
        if (FmrObject.isEmpty(o1) && FmrObject.isEmpty(o2)) {
            return true
        } else if (typeof(o1.equals) === 'function' && typeof(o2.equals) === 'function') {
            return o1.equals(o2)
        }
        return o1 === o2
    }

    static isEmpty (o) {
        if (o === undefined || o === null) {
            return true
        }
        if (Array.isArray(o) && o.length ===0) {
            return true
        }
        return false
    }
}