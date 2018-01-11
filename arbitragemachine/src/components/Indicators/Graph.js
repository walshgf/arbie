import React, { Component } from 'react';
import { commafy } from './helpers';

export default class Graph extends Component {
  
  render = () => {
    const decisionToTrade = this.props.value >= 5 ? 'Trade' : 'Hold';
    const circ = (Math.PI * (2 * 200));
    let graphVal = (this.props.value * circ) / 100;
    graphVal = isNaN(graphVal) ? (Math.PI * (2 * 199)) : (Math.PI * (2 * graphVal));
    return (
    	<div className='graph'>
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
								style={{
									strokeDasharray: circ,
									strokeDashoffset: this.props.active ? circ - graphVal : circ
								}} />
						</svg>
						<div className='decision'>
							<h3
								style={{
									color: this.props.color2
								}}>{decisionToTrade}</h3>
							<h4>
								Arbitrage:
								<span
									style={{
										color: this.props.color2
									}}>&nbsp;{(isNaN(this.props.value) ? 0 : this.props.value).toFixed(2)}%
								</span>
							</h4>
						</div>
    			</div>
    			<div className='info'>
    				<div>
              <div className='prices'>
              	<div className='price'>${commafy((this.props.highPrice).toFixed(2))}</div>
              	<div className='price'>${commafy((this.props.lowPrice).toFixed(2))}</div>
              </div>
              <div
              	style={{
              		color: this.props.color2
              	}} 
              	className='profit'>Profit: ${commafy((this.props.highPrice - this.props.lowPrice).toFixed(2))}</div>
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
