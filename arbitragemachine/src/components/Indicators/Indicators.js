import React from 'react';
import DonutChart from './DonutChart';
import './Indicators.css';
import {
    bitcoinSmallestBidExchange,
    bitcoinLargestAskExchange,
    percentageOfBitcoinArbitrageProfitable,
    ethereumSmallestBidExchange,
    ethereumLargestAskExchange,
    percentageOfEthereumArbitrageProfitable
    } from '../Compare/Compare';


class Indicators extends React.Component {
    constructor() {
        super();
        this.bitcoinArbitrageValue = percentageOfBitcoinArbitrageProfitable || 5;
        this.bitcoinLowSeller = bitcoinSmallestBidExchange ||'CoinBase';
        this.bitcoinHighBuyer = bitcoinLargestAskExchange || 'Gemini';
        this.ethereumArbitrageValue = percentageOfEthereumArbitrageProfitable || 4;
        this.ethereumLowSeller = ethereumSmallestBidExchange || 'Kraken';
        this.ethereumHighBuyer = ethereumLargestAskExchange || 'Coinbase';
        /*
        this
        */

    }

    render() {
        return (
            <div className="container">
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