import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiSearch } from "react-icons/fi";
import "./style.css";
import logo from "../../assets/logo.svg";

export default () => (
    <div id="page-home"> 
        <div className="content">
            <header>
                <img src={logo} alt="Ecollect" />
            </header>
            <main>
                <h1>Your marketplace collect waste</h1>
                <p>Helping peoples find points collect effective form.</p>
                <Link to="/create-point">
                    <span>
                        <FiLogIn />
                    </span>
                    <strong>Create point collect</strong>
                </Link>
                <Link to="/search">
                    <span>
                        <FiSearch />
                    </span>
                    <strong>Search point collect</strong>
                </Link>
            </main>
        </div>
    </div>
);