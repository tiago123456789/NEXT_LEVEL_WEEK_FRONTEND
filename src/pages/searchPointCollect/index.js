import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiLogIn, FiSearch } from "react-icons/fi";
import IbgeService from "./../../services/IbgeService";
import "./style.css";
import logo from "../../assets/logo.svg";

const ibgeService = new IbgeService();

export default () => {
    const history = useHistory();
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedUf, setSelectedUf] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const changeCity = (event) => {
        setSelectedCity(event.target.value);
    }

    const getCitiesByUf = (event) => {
        const uf = event.target.value;
        const isInvalidValue = uf == "0";
        if (isInvalidValue) {
            return;
        }
        setSelectedUf(event.target.value);
        ibgeService.getCitiesByUf(uf).then(cities => {
            setCities(cities)
        });
    }

    const redirectMapPointsCollect = () => {
        history.push(`/points-collect?uf=${selectedUf}&city=${selectedCity}`)
    }

    useEffect(() => {
        ibgeService.getUfStates().then(ufs => setUfs(ufs));
    }, []);

    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecollect" />
                </header>
                <main>
                    <h1>Search one or more collect point.</h1>
                    <form>
                        <div className="field">
                            <label htmlFor="name">State:</label>
                            <select type="text" name="state" id="state"
                                onChange={getCitiesByUf} >
                                <option value="0">Select one value</option>
                                {
                                    ufs.map(uf => (
                                        <option value={uf} key={uf}>{uf}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">City:</label>
                            <select type="text" name="city" id="city" onChange={changeCity} >
                                <option value="0">Select one value</option>
                                {
                                    cities.map((city, indice) => (
                                        <option value={city} key={indice}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </form>


                    <a onClick={redirectMapPointsCollect}>
                        <span>
                            <FiSearch />
                        </span>
                        <strong>Search point collect near</strong>
                    </a>
                </main>
            </div>
        </div>
    )
};