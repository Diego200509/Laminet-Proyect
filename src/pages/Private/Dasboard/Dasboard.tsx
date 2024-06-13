"use client";
import React from 'react';
import './Dasboard.css';
import Button from '@mui/material/Button';
import { clearLocalStorageUser, resetUser } from '../../../redux/states/user';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../../models';
import { useDispatch } from 'react-redux';

export type DasboardProps = {
	// types...
}

const Dasboard: React.FC<DasboardProps>  = ({}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(resetUser());
		navigate(`/${PublicRoutes.LOGIN}`);
	};

	return (
		<div className='dasboard'>
 			Dasboard works!

			 <Button onClick={logout} variant="outlined">logout</Button>
 		</div>
	);
};

export default Dasboard;
