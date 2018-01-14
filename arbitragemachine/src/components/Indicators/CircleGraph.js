import React, { Component } from 'react';
import Currency from '../Currency/Currency';
import { 
	findLargestAsk, 
	findSmallestAsk,
	percentageOfArbitrageAvailable,
	checkNull,
	commafy 
} from '../../helpers';
import Axios from 'axios';
import config from './config.js';
const server = require('../Compare/config').server;

export default class CircleGraph extends Component {
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
  		decisionToTrade: '',
      frontClasses: 'center',
      backClasses: 'currency'
  	}
  }

  //when new data arrives perform operations
  componentWillReceiveProps = (nextProps) => {
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

  flip = () => {
    this.setState(prevState => {
      return {
        frontClasses: prevState.frontClasses === 'center' ? 
                      'center center-rotate' : 'center',
        backClasses: prevState.backClasses === 'currency' ? 
                      'currency currency-show' : 'currency'
      }
    });
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
        className='circle-graph'
        style={{
          zIndex: this.props.index + 1
        }}>
    		<div className={this.state.frontClasses}>
          <button 
            className='flip'
            onClick={this.flip}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path fill={this.props.color2} d="M25,13C13.44,13,1,16.442,1,24c0,6.689,9.745,10.152,20,10.86v6.185L32.629,32L21,22.955v5.893C11.799,28.141,7,25.131,7,24 c0-1.285,6.189-5,18-5s18,3.715,18,5c0,0.553-1.579,2.211-6.272,3.538L36,27.743v6.174l1.24-0.307C44.823,31.734,49,28.321,49,24 C49,16.442,36.56,13,25,13z"/>
            </svg>
          </button>
    			<h2 
            onClick={this.setCurrency}
            style={{
              color: this.props.color2,
              textDecoration: 'none'
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
									strokeDashoffset: circ - graphVal
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
                <p><strong>Sell:&nbsp;</strong> {this.state.currencyHighExchange}</p>
	              <p><strong>Buy:&nbsp;</strong> {this.state.currencyLowExchange}</p>
	            </div>
    				</div>
    			</div>
    		</div>
        <Currency
          currency={this.props.heading}
          classes={this.state.backClasses}
          color1={this.props.color1}
          color2={this.props.color2}
          flip={this.flip} />
    	</div>   
    );
  }
}
