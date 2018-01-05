import React from 'react';
import {
    BrowserRouter,
    Link
    } from 'react-browser-router';
import './Navigation.css';
import logo from  './arbieLogo.png'

export default function Navigation() {
    return (
        <BrowserRouter>
            <div id="header-container">
                <header class="wrapper clearfix">
                        <h1 id="title"><img className="logo" src={logo} />Arbie - Trade Up</h1>
                    <nav>
                        <ul>
                            <li><Link to="/home">About Arbie</Link></li>
                            <li><Link to="/">Trading Tip</Link></li>
                            <li><Link to="/team">Meet the Team</Link></li>
                        </ul>
                    </nav>
                </header>
            </div>
        </BrowserRouter>
    );
}