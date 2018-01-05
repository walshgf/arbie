import React from 'react';
import {
    BrowserRouter,
    Link
    } from 'react-browser-router';
import './Navigation.css';

export default function Navigation() {
    return (
        <BrowserRouter>
            <div id="header-container">
                <header class="wrapper clearfix">
                    <h1 id="title">Arbie - We Have the Deets!</h1>
                    <nav>
                        <ul>
                            <li><Link to="/home">Arbie</Link></li>
                            <li><Link to="/chart">Chart</Link></li>
                            <li><Link to="/team">Team</Link></li>
                        </ul>
                    </nav>
                </header>
            </div>
        </BrowserRouter>
    );
}