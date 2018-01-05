import React from 'react';
import '../Navigation/Navigation.css';

export default function Homepage() {
    return (
        <div id="main-container">
            <div id="main" class="wrapper clearfix">
                
                <article>
                    <header>
                        <h2>About Arbie</h2>
                        <p>Arbie is a Web App to Provide Trading Signals, Enabling Inter-Exchange Arbitrage of Bitcoin and Ethereum Cryptocurrencies.</p>
                    </header>
                    <section>
                        <h2>The Chart</h2>
                        <p>It would be nice to have a graph here, and link it to the full page app.</p>
                    </section>
                </article>
                
                <aside>
                    <h3>This is the MVP</h3>
                    <p>Future plans are to include more exchanges, cryptocurrencies, and user settings. We'll also be adding more technical indicators to inform our trading signals.</p>
                </aside>
                
            </div>
        </div>
    );
}