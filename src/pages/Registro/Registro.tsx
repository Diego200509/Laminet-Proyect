"use client";
import React from 'react';
import './Registro.css';
import { FormularioRegistro } from './FormularioRegistro';
import { Header } from '../../components';

export type RegistroProps = {
	// types...
}

const Registro: React.FC<RegistroProps>  = ({}) => {
	return (
		<>
		<Header/>
		<FormularioRegistro />
		</>
	);
};

export default Registro;
