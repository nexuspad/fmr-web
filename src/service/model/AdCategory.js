export default class AdCategory {
    id;
    name;

    constructor (jsonObj) {
        if (jsonObj) {
            this.id = jsonObj.id
            this.name = jsonObj.name
        }
    }

    equals (category) {
        return this.id === category.id
    }
}