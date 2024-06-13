"use client";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

export type MenuProps = {
	// types...
}

const Menu: React.FC<MenuProps> = ({ }) => {
	const navigate = useNavigate();
	const handleRegistroClick = () => {
		navigate('/registro'); // Ruta de registro
	};
	return (

		<Box className='menu' sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ background: 'rgb(58, 65, 74)', padding: 0 }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<img src="./src/assets/laminetlogo.png" alt="ejemplo" />
					</IconButton>
					<Typography variant="h3" component="div" sx={{ flexGrow: 1, fontFamily: 'Alpha Echo', display: { xs: 'none', md: 'flex' } }} >
						:LAMINET
					</Typography>
					<Button sx={{ background: 'rgb(186,35,246)', fontFamily: 'Alpha Echo', margin:'0 10px' }} variant='contained' >Como invitado</Button>
					<Button sx={{ background: 'rgb(186,35,246)', fontFamily: 'Alpha Echo', margin:'0 10px' }} variant='contained' onClick={handleRegistroClick}>Registrarse</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Menu;
