import React from 'react';
import { Link } from 'react-browser-router';
import Burger from './burger/Burger';

const Nav = (props) => {
	return (
	  <header className='header'>
	    <div className='center'>
				<div className='logo'>
					<img src='arbieLogo.png' alt='Arbie' />
					<h1>RBIE</h1>
				</div>
	      <nav className='header-nav'>
	        <Link to="/home">About Arbie</Link>
	        <Link to="/">My Currencies</Link>
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

