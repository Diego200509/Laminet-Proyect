import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createUser } from '../../../../redux/states/user';
import './Body.css';
import { EndPoint, PrivateRoutes, PublicRoutes } from '../../../../models';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';

const Body: React.FC = () => {
	const [showError, setShowError] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userState = useSelector((store: AppStore) => store.user);

	useEffect(() => {
		if (userState.nombre) {
			console.log('Usuario autenticado:', userState.nombre);
			navigate(`/private/${PrivateRoutes.DASHBOARD}`);
		}
	}, [userState.nombre, navigate]);

	function handleClickOlvido () {
		navigate(`/${PublicRoutes.OLVIDO}`);
	}

	const formik = useFormik({
		initialValues: {
			correo: '',
			contrasenia: '',
		},
		validationSchema: Yup.object({
			correo: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
			contrasenia: Yup.string().required('La contraseña es obligatoria'),
		}),
		onSubmit: async values => {
			try {
				const respuesta = await fetch(EndPoint.LOGIN, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						correo: values.correo,
						contrasenia: values.contrasenia
					})
				});

				if (!respuesta.ok) {
					setShowError(true); // Mostrar alerta de error si hay un problema en la solicitud
					return;
				}

				const data = await respuesta.json();
				dispatch(createUser(data[0]));
			} catch (error) {
				setShowError(true); // Mostrar alerta de error si hay un error
				console.error('Error: ', error);
			}
		},
	});

	return (
		<div className='body'>
			<div className="izquierda">
				<Typography style={{ fontFamily: 'Alpha Echo' }} variant="h2" gutterBottom>
					PORTAFOLIO WEB
				</Typography>
				<img className='img-fondo' src="./src/assets/laminetFondoLogin.png" alt="" />
			</div>
			<div className="derecha">
				<Card sx={{ maxWidth: 345, maxHeight: 450 }}>
					<CardContent>
						<Typography style={{ fontFamily: 'Alpha Echo' }} gutterBottom variant="h4" component="div">
							INICIO DE SESIÓN
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
									label="Correo Electrónico"
									variant="standard"
									value={formik.values.correo}
									onChange={formik.handleChange}
									error={formik.touched.correo && Boolean(formik.errors.correo)}
									helperText={formik.touched.correo && formik.errors.correo} />
							</Box>
							<br />
							<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
								<Avatar>
									<HttpsIcon />
								</Avatar>
								<TextField
									fullWidth
									type="password"
									id="contrasenia"
									name="contrasenia"
									label="Contraseña"
									variant="standard"
									value={formik.values.contrasenia}
									onChange={formik.handleChange}
									error={formik.touched.contrasenia && Boolean(formik.errors.contrasenia)}
									helperText={formik.touched.contrasenia && formik.errors.contrasenia}
								/>
							</Box>
							<br />
							<Button onClick={handleClickOlvido} sx={{ color: 'rgb(180, 180, 180)' }} >
								¿Olvido su contraseña?
							</Button>
							<Button
								type='submit'
								sx={{ background: 'rgb(186,35,246)', fontFamily: 'Alpha Echo' }}
								variant="contained">
								INICIAR SESIÓN
							</Button>
						</FormControl>
						{/* Alerta de error */}
						{showError && (
							<Alert severity="error" onClose={() => setShowError(false)}>
								¡Hubo un error al iniciar sesión! Por favor, inténtalo de nuevo.
							</Alert>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Body;
