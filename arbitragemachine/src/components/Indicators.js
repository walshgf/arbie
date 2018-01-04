import React from 'react';
import DonutChart from './DonutChart';

class Indicators extends React.Component {
    constructor() {
        super();
        this.bitcoinArbitrageValue = 12;
        this.etheriumArbitrageValue = 15;
    }
    
    render() {
        return (
            <div>
                <label>BitCoin Arbitrage Percent</label>
                <DonutChart value={this.bitcoinArbitrageValue} />
                <label>Etherium Arbitrage Percent</label>
                <DonutChart value={this.etheriumArbitrageValue} />
            </div>
        );
    }
}

export default Indicators;