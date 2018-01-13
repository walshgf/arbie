import React, { Component } from 'react';
import { 
	findLargestAsk, 
	findSmallestAsk,
	percentageOfArbitrageAvailable,
	checkNull,
	commafy 
} from './helpers';
import Axios from 'axios';
import config from './config.js';
const server = require('../Compare/config').server;

export default class Graph extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		currencyHighObj: 0,
  		currencyHighPrice: 0, 
  		currencyHighExchange: '',
  		currencyLowObj: 0,
  		currencyLowPrice: 0, 
  		currencyLowExchange: '',
  		arbitragePercent: 0,
  		decisionToTrade: ''
  	}
  }

  //when new data arrives perform operations
  componentWillReceiveProps = (nextProps) => {
    console.log('received props');
  	const { data, type } = nextProps;
  	const currencyHighObj = findLargestAsk(data, type);
  	const currencyLowObj = findSmallestAsk(data, type);
  	const arbitragePercent = percentageOfArbitrageAvailable(currencyHighObj.largestAsk - currencyLowObj.smallestAsk, currencyHighObj.largestAsk);
  	//set state after operations are performed
  	this.setState({
  		currencyHighObj: currencyHighObj,
  		currencyHighPrice: currencyHighObj.largestAsk, 
  		currencyHighExchange: currencyHighObj.exchange,
  		currencyLowObj: currencyLowObj,
  		currencyLowPrice: currencyLowObj.smallestAsk, 
  		currencyLowExchange: currencyLowObj.exchange,
  		arbitragePercent: arbitragePercent,
  		decisionToTrade: arbitragePercent >= config.arb_percent ? 'Trade' : 'Hold'
  	});
  	//if the current profit percentage is above the config
  	//Post the relevent data to the db
  	if(arbitragePercent >= config.arb_percent) 
  		this.store(
  			currencyHighObj.exchange,
  			currencyHighObj.exchange,
  			currencyLowObj.smallestAsk,
  			currencyHighObj.largestAsk,
  			arbitragePercent,
  			type
  		);
  }

  //Posts data relevent to the opportunity found by the machine
  store = (be, se, bp, sp, p, ct) => {
    //ADD ethereum to Db
    Axios.post(`${server}/create/arb`, {
      buy_exchange: be, 
      sell_exchange: se, 
      buy_price: bp, 
      sell_price: sp, 
      percentage: p, 
      currency_type: ct
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  render = () => {
  	//Calculates the circumference of the svg
  	//as well as the strokeDashoffset that creates the graph
    const circ = (Math.PI * (2 * 200));
    const arbCirc = this.state.arbitragePercent * circ;
    const strokeDashoffset = arbCirc / config.arb_percent;
    let graphVal = strokeDashoffset === 0 || isNaN(strokeDashoffset) ? circ : arbCirc / config.arb_percent;
    graphVal = graphVal > circ ? circ : graphVal; 
    //The graph displays the current Arbitrage / config arbitrage
    //When the graph is full the current data gets posted to the DB
    return (
    	<div 
        className='graph'
        style={{
          zIndex: this.props.index + 1
        }}>
    		<div>
    			<h2
    				style={{
    					color: this.props.color2
    				}}>{this.props.heading}</h2>
    			<div className='circ'>
    				<svg 
							viewBox="0 0 500 500" 
							preserveAspectRatio="xMinYMin meet">
							<linearGradient id={this.props.color1}>
		            <stop 
		            	offset="0%"  
		            	stopColor={this.props.color1} />
		            <stop 
		            	offset="100%" 
		            	stopColor={this.props.color2} />
			        </linearGradient>
							<circle
								stroke="#EBEFEF"
								strokeWidth="20" 
								fill='transparent' 
								cx="250" 
								cy="250" 
								r="200"
								strokeLinecap="square" />
							<circle
								stroke={`url(#${this.props.color1})`}
								strokeWidth="20" 
								fill='transparent' 
								cx="250" 
								cy="250" 
								r="200"
								strokeLinecap="square"
								//If the component is visible (this.props.active) 
								//animate changes to the percentage
								style={{
									strokeDasharray: circ,
									strokeDashoffset: this.props.active ? circ - graphVal : circ
								}} />
						</svg>
						<div className='decision'>
							<h3
								style={{
									color: this.props.color2
								}}>{this.state.decisionToTrade}</h3>
							<h4>
								Arbitrage:
								<span
									style={{
										color: this.props.color2
									}}>&nbsp;{(isNaN(this.state.arbitragePercent) ? 0 : this.state.arbitragePercent).toFixed(2)}%
								</span>
							</h4>
						</div>
    			</div>
    			<div className='info'>
    				<div>
              <div className='prices'>
              	<div className='price'>${commafy((checkNull(this.state.currencyHighPrice)).toFixed(2))}</div>
              	<div className='price'>${commafy((checkNull(this.state.currencyLowPrice)).toFixed(2))}</div>
              </div>
              <div
              	style={{
              		color: this.props.color2
              	}} 
              	className='profit'>Profit: ${commafy((checkNull(this.state.currencyHighPrice) - checkNull(this.state.currencyLowPrice)).toFixed(2))}</div>
              <div 
              	className='buy-sell' 
              	id={this.state.arbitragePercent >= config.arb_percent ? 'data' : 'hidden'}
              	style={{ backgroundColor: this.props.color2}}>
                <p>Sell: {this.state.currencyHighExchange}</p>
	              <p>Buy: {this.state.currencyLowExchange}</p>
	            </div>
    				</div>
    			</div>
    		</div>
    	</div>   
    );
  }
}
