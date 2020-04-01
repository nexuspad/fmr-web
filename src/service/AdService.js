import RestClient from './RestClient'

export default class AdService {
    static getAds() {
        RestClient.instance().doGet('ads?categoryId=3011')
        .then((data) => {
            console.log(data);
        });
    }
}