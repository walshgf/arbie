import React from 'react';
import { Link } from 'react-browser-router';

const Menu = (props) => {
	return (
  	<section className={props.classes}>
  		<div className='center'>
  			<nav>
          <Link
            onClick={props.toggleMenu} 
            to="/home">About Arbie</Link>
          <Link
            onClick={props.toggleMenu} 
            to="/">Trading Tip</Link>
        	<Link
            onClick={props.toggleMenu} 
            to="/team">Meet the Team</Link>
        </nav>
  		</div>
  	</section>    
  );
}

export default Menu;
