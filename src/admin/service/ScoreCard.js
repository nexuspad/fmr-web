export default class ScoreCard {
    score
    comment

    constructor(jsonObj) {
        if (jsonObj) {
            this.score = jsonObj.score
            this.comment = jsonObj.comment
            this.accountEmailRiskLevel = jsonObj.accountEmailRiskLevel
            this.accountRiskLevel = jsonObj.accountRiskLevel
            this.addressRiskLevel = jsonObj.addressRiskLevel
            this.contactRiskLevel = jsonObj.contactRiskLevel
            this.ispRiskLevel = jsonObj.ispRiskLevel
        }
    }

    riskLevels() {
        return [
            'email: ' + this.accountEmailRiskLevel,
            'account: ' + this.accountRiskLevel,
            'address: ' + this.addressRiskLevel,
            'contact: ' + this.contactRiskLevel,
            'isp: ' + this.ispRiskLevel
        ]
    }
}