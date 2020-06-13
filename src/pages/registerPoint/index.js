import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import InputMask from "react-input-mask";
import ItenService from "./../../services/ItemService";
import IbgeService from "./../../services/IbgeService";
import PointService from "./../../services/PointService";
import "./style.css";
import logo from "./../../assets/logo.svg";

const itemService = new ItenService();
const ibgeService = new IbgeService();
const pointService = new PointService();

export default () => {
    const history = useHistory();
    const [itens, setItens] = useState([]);
    const [initialPosition, setInitialPosition] = useState([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState([0, 0]);
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedItems, setSelectedItem] = useState([]);
    const [selectedUf, setSelectedUf] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: ""
    });

    const handlerSubmit = (event) => {
        event.preventDefault();
        pointService.create({
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            uf: selectedUf,
            city: selectedCity,
            itens: selectedItems,
            latitude: selectedPosition[0],
            longitude: selectedPosition[1],
            path_image: "teste.png"
        }).then(() => {
            alert("Save success!!!")
            history.push("/");
        });
    }

    const changeCity = (event) => {
        setSelectedCity(event.target.value);
    }

    const changeFormData = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const selectItem = (id) => {
        if (isSelectedItem(id)) {
            const itens = selectedItems.filter(item => item != id);
            setSelectedItem([...itens]);
            return
        }
        setSelectedItem([...selectedItems, id]);
    }

    const isSelectedItem = (id) => {
        return selectedItems.indexOf(id) >= 0;
    }

    const capturePositionClickedMap = (event) => {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
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

    useEffect(() => {
        itemService
            .findAll()
            .then(itens => setItens(itens));

        navigator.geolocation.getCurrentPosition(position => {
            position = [
                position.coords.latitude,
                position.coords.longitude,
            ];
            setInitialPosition(position);
            setSelectedPosition(position);
        });

        ibgeService.getUfStates().then(ufs => setUfs(ufs));
    }, []);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecollect" />
            </header>
            <form onSubmit={handlerSubmit}>
                <h1>Register point collect</h1>
                <fieldset>
                    <legend><h2>Datas</h2></legend>
                    <div className="field">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name"
                            value={formData.name} onChange={changeFormData}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" id="email"
                                value={formData.email} onChange={changeFormData}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp:</label>

                            <InputMask mask="(99) 99999-9999" type="text" name="whatsapp" id="whatsapp"
                                value={formData.whatsapp} onChange={changeFormData}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <small>Selecione o endereço no mapa</small>
                    </legend>
                    <Map center={initialPosition} zoom={14} onClick={capturePositionClickedMap}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="state">State:</label>
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
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens</h2>
                        <small>Selecione o endereço no mapa</small>
                    </legend>
                    <ul className="items-grid" >
                        {itens.map(item => (
                            <li
                                key={item.id} onClick={() => selectItem(item.id)}
                                className={`${isSelectedItem(item.id) ? 'selected' : ''}`}>
                                <img src={item.path_image} alt={item.name} />
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button onSubmit={handlerSubmit}>Register</button>
            </form>
        </div>
    );
}