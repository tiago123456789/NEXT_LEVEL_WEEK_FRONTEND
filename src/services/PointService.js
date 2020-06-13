import HttpClient from "./HttpClient";
import CONSTANTS from "./../constants/App";

export default class PointService {

    constructor() {
        this._httpClient = new HttpClient();
    }

    create(datas) {
        return this._httpClient
            .withPath(`${CONSTANTS.API_URL}points`)
            .withDatas(datas)
            .post();
    }

    findAllByUfAndCity(uf, city) {
        return this._httpClient
            .withPath(`${CONSTANTS.API_URL}points?uf=${uf}&city=${city}`)
            .get();
    }
}