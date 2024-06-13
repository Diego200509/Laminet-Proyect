"use client";
import './Private.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from '../../models';
import { Home } from './Home';
import { Dasboard } from './Dasboard';
import { RoutesWithNotFound } from '../../utilities';



function Private () {
	return (
		<RoutesWithNotFound>
			<Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
			<Route path={PrivateRoutes.DASHBOARD} element={<Dasboard />} />
			<Route path={PrivateRoutes.HOME} element={<Home />} />
		</RoutesWithNotFound>
	);
};

export default Private;
