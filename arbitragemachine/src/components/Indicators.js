import React from 'react';
import DonutChart from './DonutChart';
import style from './Indicators.css';

class Indicators extends React.Component {
    constructor() {
        super();
        this.bitcoinArbitrageValue = 5;
        this.etheriumArbitrageValue = 4;
    }

    render() {
        return (
            <div className="container">
                <label className="icons">BitCoin Arbitrage Percent
                    <DonutChart value={this.bitcoinArbitrageValue} />
                </label>
                <label className= "icons">Etherium Arbitrage Percent
                    <DonutChart value={this.etheriumArbitrageValue} />
                </label>
            </div>
        );
    }
}

export default Indicators;