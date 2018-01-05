import React from 'react';
import DonutChart from './DonutChart';
import style from './Indicators.css';

class Indicators extends React.Component {
    constructor() {
        super();
        this.bitcoinArbitrageValue = 5;
        this.bitcoinLowSeller = 'CoinBase';
        this.bitcoinHighBuyer = 'Gemini';
        this.etheriumArbitrageValue = 4;
        this.etheriumLowSeller = 'Kraken';
        this.etheriumHighBuyer = 'Coinbase';

    }

    render() {
        return (
            <div className="container">
                <label className="icons">BitCoin Arbitrage Percent
                    <DonutChart value={this.bitcoinArbitrageValue} lowSeller={this.bitcoinLowSeller} highBuyer={this.bitcoinHighBuyer} />
                </label>
                <label className= "icons">Etherium Arbitrage Percent
                    <DonutChart value={this.etheriumArbitrageValue} lowSeller={this.etheriumLowSeller} highBuyer={this.etheriumHighBuyer} />
                </label>
            </div>
        );
    }
}

export default Indicators;