import AbstractService from "./AbstractService";
import CONSTANTS from "./../constants/App";

export default class IbgeService extends AbstractService {

    constructor() {
        super();
    }

    getUfStates() {
        return this.getHttpClient()
            .withPath(`${CONSTANTS.IBGE_URL_BASE}/estados`)
            .get()
            .then(states => {
                const initialsStates = states.map(state => state.sigla);
                return initialsStates;
            });
    }

    getCitiesByUf(ufState) {
        return this.getHttpClient()
        .withPath(`${CONSTANTS.IBGE_URL_BASE}/estados/${ufState}/municipios`)
        .get()
        .then(cities => {
            const nameCities = cities.map(city => city.nome);
            return nameCities;
        });
    }
}