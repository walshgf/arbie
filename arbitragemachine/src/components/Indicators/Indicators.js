import React from 'react';
import DonutChart from './DonutChart';
import './Indicators.css';
import {
    bitcoinSmallestBidObject,
    bitcoinLargestAskObject,
    isBitcoinArbitrageProfitable,
    ethereumSmallestBidObject,
    ethereumLargestAskObject,
    isEthereumArbitrageProfitable
    } from '../Compare/Compare';


class Indicators extends React.Component {
    constructor() {
        super();
        this.bitcoinArbitrageValue = 5;
        this.bitcoinLowSeller = 'CoinBase';
        this.bitcoinHighBuyer = 'Gemini';
        this.ethereumArbitrageValue = 4;
        this.ethereumLowSeller = 'Kraken';
        this.ethereumHighBuyer = 'Coinbase';

    }

    render() {
        return (
            <div className="container">
            <div>{isBitcoinArbitrageProfitable}, {isEthereumArbitrageProfitable}</div>
               <label className="icons">BitCoin Arbitrage Percent
                    <DonutChart value={this.bitcoinArbitrageValue} lowSeller={this.bitcoinLowSeller} highBuyer={this.bitcoinHighBuyer} />
                </label>
                <label className= "icons">Ethereum Arbitrage Percent
                    <DonutChart value={this.ethereumArbitrageValue} lowSeller={this.ethereumLowSeller} highBuyer={this.ethereumHighBuyer} />
                </label>
            </div>
        );
    }
}

export default Indicators;