import axios from "axios";

export default class HttpClient {

    constructor() {
        this._path = "";
        this._headers = {};
        this._datas = null;
    }

    withDatas(datas) {
        this._datas = datas;
        return this;
    }

    withPath(path) {
        this._path = path;
        return this;
    }

    withHeaders(key, value) {
        this._headers[key] = value;
        return this;
    }


    get() {
        return axios.get(this._path, { headers: this._headers })
        .then(this._extractDatasInResponse);
    }

    delete() {
        return axios.delete(this._path, { headers: this._headers })
        .then(this._extractDatasInResponse);
    }

    post() {
        return axios.post(this._path, this._datas, { headers: this._headers })
             .then(this._extractDatasInResponse);
    }

    put() {
        return axios.put(this._path, this._datas, { headers: this._headers })
             .then(this._extractDatasInResponse);
    }

    _extractDatasInResponse(response) {
        if (response.data) {
            return response.data;
        }

        return response;
    }
}