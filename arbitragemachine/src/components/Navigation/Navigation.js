import React from 'react';
import style from './Navigation.css';

export default function Navigation() {
    return (
	<div id="header-container">
    <header class="wrapper clearfix">
        <h1 id="title">Arbie - We Have the Deets!</h1>
        <nav>
            <ul>
                <li><a href="#">Arbie</a></li>
                <li><a href="#">Chart</a></li>
                <li><a href="#">Team</a></li>
            </ul>
        </nav>
    </header>
</div>
    );
}