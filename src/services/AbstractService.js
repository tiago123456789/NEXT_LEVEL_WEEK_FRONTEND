import HttpClient from "./HttpClient";

export default class AbstractService {

    constructor() { 
        this._httpClient = new HttpClient();
    }

    getHttpClient() {
        return this._httpClient;
    }
}