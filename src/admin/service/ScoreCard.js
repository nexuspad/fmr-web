export default class ScoreCard {
    score
    comment

    constructor(jsonObj) {
        if (jsonObj) {
            this.score = jsonObj.score
            this.comment = jsonObj.comment    
        }
    }
}