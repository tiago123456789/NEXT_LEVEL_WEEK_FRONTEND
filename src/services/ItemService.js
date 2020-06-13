import HttpClient from "./HttpClient";
import CONSTANTS from "./../constants/App";

export default class ItemService {

    constructor() {
        this._httpClient = new HttpClient();
    }

    findAll() {
        return this._httpClient
            .withPath(`${CONSTANTS.API_URL}itens`)
            .get();
    }
}