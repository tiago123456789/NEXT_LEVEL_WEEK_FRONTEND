import React from "react";
import Home from "./pages/home";
import Search from "./pages/searchPointCollect";
import PointsCollectMap from "./pages/pointsCollectMap"
import RegisterPoint from "./pages/registerPoint";
import { BrowserRouter, Route } from "react-router-dom";

export default () => (
    <BrowserRouter>
        <Route path="/" exact component={Home}/>
        <Route path="/search" exact component={Search}/>
        <Route path="/create-point" exact component={RegisterPoint} />
        <Route path="/points-collect" exact component={PointsCollectMap} />

    </BrowserRouter>
)