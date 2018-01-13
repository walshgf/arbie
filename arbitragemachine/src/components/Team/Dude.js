import React, { Component } from 'react';

export default class Dude extends Component {
  constructor(props) {
  	super(props);
  	this.state = { classes: 'dude' }
  }

  //Animate touches and mouse entrance/leave

  viewing = () => this.setState({classes: 'dude dude-active'});

  exit = () => this.setState({classes: 'dude'});

  render = () => {
    return (
    	<div 
    		className={this.state.classes}
    		onTouchStart={this.viewing}
    		onMouseEnter={this.viewing}
    		onTouchEnd={this.exit}
    		onMouseLeave={this.exit}>
        <img 
        	className="author" 
        	src={this.props.image} 
        	alt={this.props.name} />
        <div className='overlay'>
	        <h3><b>
	        	{
              //Create split text effect
	        		this.props.name.split('').map((letter, i) => {
	        			if(letter === ' ') {
                  //render a non breaking space if letter is a space
	        				return (
	        					<div>&nbsp;</div>
	        				);
	        			} else {
	        				return (
                    //progressively larger transition delay creates stagger effect
	        					<div
	        						key={i}
	        						style={{
	        							transitionDelay: `${i/30}s`
	        						}}>{letter}</div>
	        				);
	        			}
	        		})
	        	}
	        </b></h3>
	        <p className="bio">{this.props.bio}</p>
        </div>
      </div>    
    );
  }
}

