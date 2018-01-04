import React from 'react';
import DonutChart from './DonutChart';

class Indicators extends React.Component {
    constructor() {
        super();
        this.bitcoinArbitrageValue = 5;
        this.etheriumArbitrageValue = 4;
    }

    render() {
        return (
            <div>
                <label>BitCoin Arbitrage Percent
                    <DonutChart value={this.bitcoinArbitrageValue} />
                </label>
                <label>Etherium Arbitrage Percent
                    <DonutChart value={this.etheriumArbitrageValue} />
                </label>
            </div>
        );
    }
}

export default Indicators;