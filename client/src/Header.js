import React from 'react'
import './Header.css'

function Header(){
	return(
		<div className="header"> 
			<ul className="header-left">
				<li className="logo"><a href="/"> MovieScrape </a></li>
			</ul>
			<ul className="header-right">
 				<li> <a href="/"> Add </a> </li>
 				<li> <a href="/"> View </a> </li>
			</ul>
		</div>
	)
}


export default Header;