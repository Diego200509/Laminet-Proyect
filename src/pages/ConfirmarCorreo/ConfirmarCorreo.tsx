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
import './ConfirmarCorreo.css';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { EndPoint, PrivateRoutes, PublicRoutes } from '../../models';
import { createUser } from '../../redux/states/user';
import { Header } from '../../components';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export type ConfirmarCorreoProps = {
	// types...
}

const ConfirmarCorreo: React.FC<ConfirmarCorreoProps> = ({ }) => {
	const [showError, setShowError] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((store: AppStore) => store.user);

	useEffect(() => {
		if (userState.confirmar) {
			console.log('Usuario autenticado:', userState.correo);
			navigate(`/private/${PrivateRoutes.DASHBOARD}`);
		}
	}, [userState.confirmar]);

	const formik = useFormik({
		initialValues: {
			codigo: '',
			correo: ''
		},
		validationSchema: Yup.object({
			codigo: Yup.string().required('El codigo es obligatorio')
		}),
		onSubmit: async values => {
			try {
				const respuesta = await fetch(EndPoint.CONFIRMAR_CORREO, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						codigo: values.codigo,
						correo: userState.correo
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
		<>
			<Header />
			<div className="confirmarcorreo">

				<Card className='centrar' sx={{ maxWidth: 345, maxHeight: 600 }}>
					<CardContent>
						<Typography style={{ fontFamily: 'Alpha Echo' }} gutterBottom variant="h4" component="div">
							CONFIRMAR CONTRASEÑA
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
							<Button
								type='submit'
								sx={{ background: 'rgb(186,35,246)', fontFamily: 'Alpha Echo' }}
								variant="contained">
								CONFIRMAR
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

export default ConfirmarCorreo;
