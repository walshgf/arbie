import React, { Component } from 'react';
import { hexToRgbA } from '../../helpers';

export default class LineGraph extends Component {
  constructor(props) {
  	super(props);
  }

  render = () => {
    return (
    	<div 
    		className='line-graph'
    		style={{
    			borderLeft: `1px solid ${this.props.color2}`,
					borderBottom: `1px solid ${this.props.color2}`
    		}}>
				{
					[60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0].map((time, i) => {
						return (
							<div 
								className='line'
								key={i}
								data-time={time}
								data-color={this.props.color2}
								style={{
									borderRight: `1px solid ${hexToRgbA(this.props.color2, 0.15)}`
								}}>
								<div
									className='graph-bar'
									style={{
										height: `${(i/12) * 100}%`,
										background: this.props.color2,
										boxShadow: `-2px 0px 5px ${this.props.color2}`
									}}></div>
							</div>
						);
					})
				}
			</div>  
    );
  }
}
