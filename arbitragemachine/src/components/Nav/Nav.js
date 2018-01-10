import React from 'react';
import { Link } from 'react-browser-router';
import Burger from './burger/Burger';

const Nav = (props) => {
	return (
	  <header className='header'>
	    <div className='center'>
				<h1>ARBIE</h1>
	      <nav className='header-nav'>
	        <Link to="/home">About Arbie</Link>
	        <Link to="/">Trading Tip</Link>
	        <Link to="/team">Meet the Team</Link>
	      </nav>
	      <Burger
	      	classes={props.classes}
	      	toggleMenu={props.toggleMenu} />
	    </div>
	  </header>
	);
}

export default Nav;

