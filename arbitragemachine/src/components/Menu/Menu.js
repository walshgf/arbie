import React from 'react';
import { Link } from 'react-browser-router';

const Menu = (props) => {
	return (
  	<section className={props.classes}>
  		<div className='center'>
  			<nav>
          <Link to="/home">About Arbie</Link>
          <Link to="/">Trading Tip</Link>
        	<Link to="/team">Meet the Team</Link>
        </nav>
  		</div>
  	</section>    
  );
}

export default Menu;
