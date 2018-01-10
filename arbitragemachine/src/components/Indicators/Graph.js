import React, { Component } from 'react';

export default class Graph extends Component {
  constructor(props) {
  	super(props);
  }

  render = () => {
    const decisionToTrade = this.props.value >= 5 ? 'Trade' : 'Hold';
    const circ = (Math.PI * (2 * 200));
    let graphVal = (this.props.value * circ) / 100;
    graphVal = isNaN(graphVal) || 0 ? (Math.PI * (2 * 199)) : (Math.PI * (2 * graphVal));
    console.log(graphVal);
    return (
    	<div className='graph'>
    		<div>
    			<h2>{this.props.heading}</h2>
    			<div className='circ'>
    				<svg 
							viewBox="0 0 500 500" 
							preserveAspectRatio="xMinYMin meet"
							style={{
								filter: `drop-shadow( 0px 0px 7.5px #749CFF)`
							}}>
							<linearGradient id="grade">
		            <stop offset="0%"  stopColor='#749CFF' />
		            <stop offset="100%" stopColor='#75E4FF' />
			        </linearGradient>
							<circle
								stroke="#D7EAFF"
								strokeWidth="20" 
								fill='transparent' 
								cx="250" 
								cy="250" 
								r="200"
								strokeLinecap="round" />
							<circle
								stroke="url(#grade)"
								strokeWidth="20" 
								fill='transparent' 
								cx="250" 
								cy="250" 
								r="200"
								strokeLinecap="round"
								style={{
									strokeDasharray: circ,
									strokeDashoffset: circ - graphVal
								}} />
						</svg>
    			</div>
    			<div className='info'>
    				<div>
    					<h3>It is recommended that you <strong>{decisionToTrade}</strong></h3>
    					<p>Arbitrage Percentage: {(this.props.value).toFixed(2)}%</p>
              <div>HP:{(this.props.highPrice).toFixed(2)} LP:{(this.props.lowPrice).toFixed(2)}</div>
              <div>${(this.props.highPrice - this.props.lowPrice).toFixed(2)} Profit </div>
              <div id ={this.props.value >= 5 ? 'data' : 'hidden'}>
	              <p>Buy from: {this.props.lowSeller}</p>
	              <p>Sell to: {this.props.highBuyer}</p>
	            </div>
    				</div>
    			</div>
    		</div>
    	</div>   
    );
  }
}
