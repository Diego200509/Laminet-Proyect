import BadgeIcon from '@mui/icons-material/Badge';
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
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { EndPoint, PrivateRoutes, PublicRoutes } from '../../../models';
import './FormularioRegistro.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';
import { createUser } from '../../../redux/states/user';

export type FormularioRegistroProps = {
	// types...
}

const FormularioRegistro: React.FC<FormularioRegistroProps> = ({ }) => {
	const [showError, setShowError] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((store: AppStore) => store.user);

	useEffect(() => {
		if (userState.correo) {
			console.log('Usuario autenticado:', userState.nombre);
			navigate(`/${PublicRoutes.CONFIRMAR}`);
		}
	}, [userState.nombre]);

	const formik = useFormik({
		initialValues: {
			nombre: '',
			apellido: '',
			correo: '',
			contrasenia: '',
			avatar: 'NULL',
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('El nombre es obligatorio'),
			apellido: Yup.string().required('El apellido es obligatorio'),
			correo: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
			contrasenia: Yup.string().required('La contraseña es obligatoria'),
		}),
		onSubmit: async values => {
			try {
				const respuesta = await fetch(EndPoint.REGISTRAR, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						nombre: values.nombre,
						apellido: values.apellido,
						correo: values.correo,
						contrasenia: values.contrasenia,
						avatar: values.avatar
					})
				});

				if (!respuesta.ok) {
					console.log('error en ok: '+respuesta.json());
					setShowError(true); // Mostrar alerta de error si hay un problema en la solicitud
					return;
				}
				
				const data = await respuesta.json();
				dispatch(createUser(data));

			} catch (error) {
				setShowError(true); // Mostrar alerta de error si hay un error
				console.error('Error: ', error);
			}
		},
	});

	return (
		<div className="centrar-formulario">

			<Card  sx={{ maxWidth: 345, maxHeight: 600 }}>
				<CardContent>
					<Typography style={{ fontFamily: 'Alpha Echo' }} gutterBottom variant="h4" component="div">
						REGISTRO DE USUARIO
					</Typography>

					<FormControl component="form" onSubmit={formik.handleSubmit} >
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							<Avatar>
								<BadgeIcon />
							</Avatar>
							<TextField
								fullWidth
								id="nombre"
								name="nombre"
								label="Nombre"
								variant="standard"
								value={formik.values.nombre}
								onChange={formik.handleChange}
								error={formik.touched.nombre && Boolean(formik.errors.nombre)}
								helperText={formik.touched.nombre && formik.errors.nombre} />
						</Box>
						<br />
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							<Avatar>
							<BadgeIcon />
							</Avatar>
							<TextField
								fullWidth
								id="apellido"
								name="apellido"
								label="Apellido"
								variant="standard"
								value={formik.values.apellido}
								onChange={formik.handleChange}
								error={formik.touched.apellido && Boolean(formik.errors.apellido)}
								helperText={formik.touched.apellido && formik.errors.apellido} />
						</Box>
						<br />
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
						<Button
							type='submit'
							sx={{ background: 'rgb(186,35,246)', fontFamily: 'Alpha Echo' }}
							variant="contained">
							REGISTRAR
						</Button>
					</FormControl>
					{/* Alerta de error */}
					{showError && (
						<Alert severity="error" onClose={() => setShowError(false)}>
							¡Hubo un error al Registrar el usuario! Por favor, inténtalo de nuevo.
						</Alert>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default FormularioRegistro;
