import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLocation } from "react-router-dom";
import PointService from "./../../services/PointService";

const pointService = new PointService();

export default () => {
    const location = useLocation();
    const [initialPosition, setInitialPosition] = useState([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState([0, 0]);
    const [points, setPoints] = useState([]);

    const capturePositionClickedMap = (event) => {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    const getUfAndCityParams = () => {
        const querystring = new URLSearchParams(location.search);
        return {
            uf: querystring.get("uf"),
            city: querystring.get("city")
        };
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            position = [
                position.coords.latitude,
                position.coords.longitude,
            ];
            setInitialPosition(position);
            setSelectedPosition(position);
        });


        const querystringParams = getUfAndCityParams();
        pointService
            .findAllByUfAndCity(querystringParams.uf, querystringParams.city)
            .then(points => {
                setPoints(points)
            });

    }, []);

    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecollect" />
                </header>
                <Map
                    style={{ "z-index": "10", width: "100%", margin: " 50px auto", height: '600px' }}
                    center={initialPosition} zoom={14} onClick={capturePositionClickedMap}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { points.map((point, indice) => (
                        <Marker  key={indice} position={[point.latitude, point.longitude]} >
                            <Popup>
                                <img src={point.path_image}
                                 alt="enterprise logo"
                                 style={{ width: "150px", height: "150px" }}
                                 />
                                <ul style={{ "listStyle": "none" }}>
                                    <li>Point collect: {point.name}</li>
                                    <li>Email: {point.email}</li>
                                    <li>Whatsapp: {point.whatsapp}</li>
                                </ul>
                            </Popup>
                        </Marker>
                    ))}
                </Map>
            </div>
        </div>
    )
};