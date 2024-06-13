"use client";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
export type HeaderProps = {
	// types...
}

const Header: React.FC<HeaderProps>  = ({}) => {
	const navigate = useNavigate();
	const handlePrincipalClick = () => {
		navigate('/private'); 
	};
	return (

		<Box className='header' sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ background: 'rgb(58, 65, 74)', padding: 0 }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={handlePrincipalClick}
					>
						<img src="./src/assets/laminetlogo.png" alt="ejemplo" />
					</IconButton>
					<Typography variant="h3" component="div" sx={{ flexGrow: 1, fontFamily: 'Alpha Echo', display: { xs: 'none', md: 'flex' } }} >
						:LAMINET
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	)
};

export default Header;
