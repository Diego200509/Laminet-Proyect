"use client";
import EmailIcon from '@mui/icons-material/Email';
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Header } from '../../components';
import { EndPoint, PrivateRoutes, PublicRoutes } from '../../models';
import { createUser } from '../../redux/states/user';
import { AppStore } from '../../redux/store';
import './OlvidoContraseña.css';

export type OlvidoContraseñaProps = {
	// types...
}

const OlvidoContraseña: React.FC<OlvidoContraseñaProps>  = ({}) => {
	const [showError, setShowError] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((store: AppStore) => store.user);

	useEffect(() => {
		if (userState.confirmar) {
			console.log('Usuario autenticado:', userState.correo);
			navigate(`/${EndPoint.OLVIDO_CONTRASEÑA}`);
		}
	}, [userState.confirmar]);

	const formik = useFormik({
		initialValues: {
			correo: ''
		},
		validationSchema: Yup.object({
			correo: Yup.string().email().required('El correo es obligatorio')
		}),
		onSubmit: async values => {
			try {
				const respuesta = await fetch(EndPoint.OLVIDO_CONTRASEÑA, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						correo: values.correo
					})
				});

				if (!respuesta.ok) {
					setShowError(true); // Mostrar alerta de error si hay un problema en la solicitud
					return;
				}else {
					dispatch(createUser({'correo':values.correo}));
					navigate(`/${PublicRoutes.CAMBIAR}`);
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
		<div className="olvidocontraseña">

				<Card className='centrar' sx={{ maxWidth: 345, maxHeight: 600 }}>
					<CardContent>
						<Typography style={{ fontFamily: 'Alpha Echo' }} gutterBottom variant="h4" component="div">
							Olvido Contraseña
						</Typography>

						<FormControl component="form" onSubmit={formik.handleSubmit} >
							<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
								<Avatar>
								<EmailIcon />
								</Avatar>
								<TextField
									fullWidth
									id="correo"
									name="correo"
									label="Correo"
									variant="standard"
									value={formik.values.correo}
									onChange={formik.handleChange}
									error={formik.touched.correo && Boolean(formik.errors.correo)}
									helperText={formik.touched.correo && formik.errors.correo} />
							</Box>
							<br />
							<Button
								type='submit'
								sx={{ background: 'rgb(186,35,246)', fontFamily: 'Alpha Echo' }}
								variant="contained">
								Enviar
							</Button>
						</FormControl>
						{/* Alerta de error */}
						{showError && (
							<Alert severity="error" onClose={() => setShowError(false)}>
								¡Hubo un error al Confirmar el usuario! Por favor, inténtalo de nuevo.
							</Alert>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default OlvidoContraseña;
