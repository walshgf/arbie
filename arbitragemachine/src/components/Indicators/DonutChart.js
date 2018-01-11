import React from 'react';
import './DonutChart.css';
let axios = require('axios');
const server = require('../Compare/config').server;
const arb_percent = require('./config').arb_percent;

class DonutChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            valueLabel: null,
            size: null,
            strokeWidth: null,
        };
    }
    componentDidMount(){
        this.setState({
            valueLabel: 'Completed',
            size: 116,
            strokeWidth: 26,
        });
    }
    render() {
        const parent = this.props.parent;
        const type = this.props.type;

        const currencyHighObj = parent.findLargestAsk(parent.apiData, type);
        const currencyHighPrice = currencyHighObj.largestAsk;
        const currencyHighExchange = currencyHighObj.exchange;

        const currencyLowObj = parent.findSmallestAsk(parent.apiData, type);
        const currencyLowPrice = currencyLowObj.smallestAsk;
        const currencyLowExchange = currencyLowObj.exchange;

        const arbitragePercent = parent.percentageOfArbitrageAvailable(currencyHighPrice - currencyLowPrice, currencyHighPrice);      
       
        const halfSize = (this.state.size * 0.5);
        const radius = halfSize - (this.state.strokeWidth * 0.5);
        const circumference = 2 * Math.PI * radius;
        const strokeVal = ((arbitragePercent * circumference)/ 100);
        const dashVal = (strokeVal * 11 + ' ' + circumference);

        const trackStyle = {strokeWidth: this.state.strokeWidth};
        const indicatorStyle = {strokeWidth: this.state.strokeWidth, strokeDasharray: dashVal};
        const rotateVal = 'rotate(-90 '+halfSize+','+halfSize+')';

        const decisionToTrade = arbitragePercent >= arb_percent ? 'Trade' : 'Hold';

        if(arbitragePercent >= arb_percent){
            //ADD ethereum to Db
            axios.post(`${server}/create/arb`, {
                buy_exchange: currencyLowExchange, 
                sell_exchange: currencyHighExchange, 
                buy_price: currencyLowPrice, 
                sell_price: currencyHighPrice, 
                percentage: arbitragePercent, 
                currency_type: type
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }

        return (
            <div>
                <svg width={this.state.size} height={this.state.size} className ="donutchart">
                <circle r={radius} cx={halfSize} cy={halfSize} transform={rotateVal} style={trackStyle} className="donutchart--track"/>
                    <circle r={radius} cx={halfSize} cy={halfSize} transform={rotateVal} style={indicatorStyle} className={arbitragePercent >= arb_percent ? "donutchart--indicator--green" : "donutchart--indicator--red"}/>
                    <text className="donutchart--text" x={halfSize} y={halfSize} style={{textAnchor:'middle'}} >
                        <tspan className="donutchart--text_val">{(arbitragePercent).toFixed(0)}</tspan>
                        <tspan className="donutchart--text_percent">%</tspan>
                        <tspan className="donutchart--text_label" x={halfSize} y={halfSize+10}>{this.props.valueLabel}</tspan>
                    </text>
                </svg>
                <div>
                    <p><b>We Recommend You {decisionToTrade}</b></p>
                    <p>Arbitrage Percentage: {(arbitragePercent).toFixed(2)}%</p>
                    <div> LP:${(currencyLowPrice).toFixed(2)} HP:${(currencyHighPrice).toFixed(2)}</div>
                    <div>${(currencyHighPrice - currencyLowPrice).toFixed(2)} Profit </div>
                    <div id ={arbitragePercent >= arb_percent ? 'data' : 'hidden'}>
                    <p>Buy from: {currencyLowExchange}</p>
                    <p>Sell to: {currencyHighExchange}</p>
                    </div>
                </div>
    
            </div>            
        );
    }
}

export default DonutChart;