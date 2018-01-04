import React from 'react';
import DonutChart from './DonutChart';

class Indicators {
    getInitialState() {
        return {
            bitcoinArbitrageValue: 55,
            etheriumArbitrageValue: 12,
        };
    }
    updateVal(e){
        this.setState({bitcoinArbitrageValue: e.target.value})
    }
    render() {
        return (
            <div>
                <label>BitCoin Arbitrage Percent</label>
                <DonutChart value={this.state.bitcoinArbitrageValue} />
                <br />
                <label>Etherium Arbitrage Percent</label>
                <DonutChart value={this.state.etheriumArbitrageValue} />
            </div>
        );
    }
}