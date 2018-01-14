import React, { Component } from 'react';
import LineGraph from './LineGraph.js';
import { capitalize } from '../../helpers';

export default class Currency extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		currency: {}
  	}
  	this.currencies = [
      {type: "BTC_USD", heading: 'Bitcoin', color1: "#FFF056", color2: "#FE9C1F"},
      {type: "ETH_USD", heading: 'Ethereum', color1: "#A7CAFF", color2: "#4C99FF"},
      {type: "BTC_USD", heading: 'Bitcoin', color1: "#FFF056", color2: "#FE9C1F"},
      {type: "ETH_USD", heading: 'Ethereum', color1: "#A7CAFF", color2: "#4C99FF"},
    ]; 
  }

  componentDidMount = () => this.setCurrency(this.props);

  componentWillReceiveProps = (nextProps) => {
  	if(nextProps.currency !== this.props.currency) this.setCurrency(nextProps);
  }

	setCurrency = (props) => {
		const currency = this.currencies.reduce(cur => cur.heading === capitalize(props.currency));
  	this.setState({currency: currency[0]});
	}

  render = () => {
    return (
    	<section className={this.props.classes}>
    		<div className='lines'>
          <button 
            className='flip'
            onClick={this.props.flip}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path fill={this.props.color2} d="M25,13C13.44,13,1,16.442,1,24c0,6.689,9.745,10.152,20,10.86v6.185L32.629,32L21,22.955v5.893C11.799,28.141,7,25.131,7,24 c0-1.285,6.189-5,18-5s18,3.715,18,5c0,0.553-1.579,2.211-6.272,3.538L36,27.743v6.174l1.24-0.307C44.823,31.734,49,28.321,49,24 C49,16.442,36.56,13,25,13z"/>
            </svg>
          </button>
    			<h2
            style={{
              color: this.props.color2
            }}>{capitalize(this.props.currency)}</h2>
    			<LineGraph
            color1={this.props.color1}
            color2={this.props.color2} />
    			<label>Seconds Elapsed</label>
    		</div>
    	</section>    
    );
  }
}
