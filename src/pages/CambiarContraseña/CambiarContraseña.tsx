"use client";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Header } from '../../components';
import { EndPoint, PublicRoutes } from '../../models';
import { createUser } from '../../redux/states/user';
import { AppStore } from '../../redux/store';
import './CambiarContraseña.css';

export type CambiarContraseñaProps = {
	// types...
}

const CambiarContraseña: React.FC<CambiarContraseñaProps> = ({ }) => {
	const [showError, setShowError] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((store: AppStore) => store.user);


	const formik = useFormik({
		initialValues: {
			codigo: '',
			correo: '',
			contrasenia: ''
		},
		validationSchema: Yup.object({
			codigo: Yup.string().required('El codigo es obligatorio'),
			contrasenia: Yup.string().required('La nueva contraseña es obligatoria')
		}),
		onSubmit: async values => {
			try {
				const respuesta = await fetch(EndPoint.CAMBIAR_CONTRASEÑA, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						codigo: values.codigo,
						correo: userState.correo,
						contrasenia: values.contrasenia
					})
				});

				if (!respuesta.ok) {
					setShowError(true); // Mostrar alerta de error si hay un problema en la solicitud
					return;
				} else {
					const data = await respuesta.json();
					//dispatch(createUser(data[0]));
					navigate(`/${PublicRoutes.LOGIN}`);
				}


			} catch (error) {
				setShowError(true); // Mostrar alerta de error si hay un error
				console.error('Error: ', error);
			}
		},
	});
	return (
		<>
			<Header />
			<div className="combiarcontraseña">

				<Card className='centrar' sx={{ maxWidth: 345, maxHeight: 600 }}>
					<CardContent>
						<Typography style={{ fontFamily: 'Alpha Echo' }} gutterBottom variant="h4" component="div">
							CAMBIAR CONTRASEÑA
						</Typography>

						<FormControl component="form" onSubmit={formik.handleSubmit} >
							<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
								<Avatar>
									<VpnKeyIcon />
								</Avatar>
								<TextField
									fullWidth
									id="codigo"
									name="codigo"
									label="Codigo"
									variant="standard"
									value={formik.values.codigo}
									onChange={formik.handleChange}
									error={formik.touched.codigo && Boolean(formik.errors.codigo)}
									helperText={formik.touched.codigo && formik.errors.codigo} />
							</Box>
							<br />
							<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
								<Avatar>
									<VpnKeyIcon />
								</Avatar>
								<TextField
									fullWidth
									type='password'
									id="contrasenia"
									name="contrasenia"
									label="Nueva Contraseña"
									variant="standard"
									value={formik.values.contrasenia}
									onChange={formik.handleChange}
									error={formik.touched.contrasenia && Boolean(formik.errors.contrasenia)}
									helperText={formik.touched.contrasenia && formik.errors.contrasenia} />
							</Box>
							<br />
							<Button
								type='submit'
								sx={{ background: 'rgb(186,35,246)', fontFamily: 'Alpha Echo' }}
								variant="contained">
								Actualizar
							</Button>
						</FormControl>
						{/* Alerta de error */}
						{showError && (
							<Alert severity="error" onClose={() => setShowError(false)}>
								¡Hubo un error al Cambiar la contraseña! Por favor, inténtalo de nuevo.
							</Alert>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default CambiarContraseña;
