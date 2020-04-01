export default class RestClient {
    static base = 'http://localhost:8080/'

    static instance () {
        return new RestClient()
    }

    doGet (uri) {
        return fetch(RestClient.base + uri)
        .then((response) => {
            return response.json();
        })
    }
}