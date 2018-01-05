import React from 'react';
import { BrowserRouter, Link } from 'react-browser-router';
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
            <div>
                <BrowserRouter><Link to="/historicalData" className="link">See Historical Data</Link></BrowserRouter>
                <div className="container">
                    <label className="icons">Largest Possible BitCoin Arbitrage Percent <br/><br/>
                        <DonutChart value={this.bitcoinArbitrageValue} lowSeller={this.bitcoinLowSeller} highBuyer={this.bitcoinHighBuyer} />
                    </label>
                    <label className= "icons">Largest Possible Ethereum Arbitrage Percent <br/><br/>
                        <DonutChart value={this.ethereumArbitrageValue} lowSeller={this.ethereumLowSeller} highBuyer={this.ethereumHighBuyer} />
                    </label>
                </div>
            </div>
        );
    }
}

export default Indicators;