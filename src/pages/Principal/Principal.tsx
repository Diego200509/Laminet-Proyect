"use client";
import React from 'react';
import './Principal.css';
import { Menu } from './components/Menu';
import { Body } from './components/Body';

export type PrincipalProps = {
	// types...
}

const Principal: React.FC<PrincipalProps>  = ({}) => {
	return (
		<div className='principal'>
 			<Menu />
			<Body />
 		</div>
	);
};

export default Principal;
