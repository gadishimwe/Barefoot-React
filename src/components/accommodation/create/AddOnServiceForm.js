/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
	Grid,
	Card,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	InputAdornment,
	Button,
	IconButton,
	CardActions
} from '@material-ui/core';
import 'regenerator-runtime/runtime';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as yup from 'yup';
import { Formik, Form, FieldArray, getIn } from 'formik';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	divider: {
		margin: theme.spacing(1)
	},
	button: {
		minWidth: 180,
		marginBottom: theme.spacing(1)
	},
	button1: {
		minWidth: 180,
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	cardAction: {
		display: 'block'
	},
	centered: {
		display: 'flex',
		justifyContent: 'center'
	}
}));
const AddOnSchema = yup.object().shape({
	addOnServices: yup.array().of(
		yup.object().shape({
			serviceName: yup
				.string()
				.matches(/^[a-zA-Z .]+$/, 'serviceName must contain only letters')
				.min(2, 'serviceName must be at least 2 characters')
				.required('serviceName is a required field'),
			description: yup
				.string()
				.min(5, 'description must be at least 5 characters')
				.required('Enter Description'),
			price: yup.number().required('Price should be a number')
		})
	)
});

const AddOnServiceForm = React.memo(allProps => {
	const { formValues, activeStep, handleBack, handleNext, isLastStep } = allProps;
	const classes = useStyles();

	return (
		<Card>
			<CardHeader title='Add accommodation add-ons' />
			<Formik
				initialValues={{
					addOnServices: formValues.addOnServices
				}}
				validationSchema={AddOnSchema}
				onSubmit={values => {
					handleNext(values, isLastStep ? 'ready' : 'notReady');
				}}
				data-test='accommodationForm'
			>
				{props => {
					return (
						<Form>
							<CardContent>
								<FieldArray
									name='addOnServices'
									render={arrayHelpers => (
										<div>
											{props.values.addOnServices.map((addOnService, index) => {
												const serviceName = `addOnServices[${index}].serviceName`;
												const errorServiceName = getIn(props.errors, serviceName);

												const description = `addOnServices[${index}].description`;
												const errorDescription = getIn(props.errors, description);

												const price = `addOnServices[${index}].price`;
												const errorPrice = getIn(props.errors, price);

												return (
													<React.Fragment key={index}>
														<Grid container spacing={4}>
															<Grid item md={3} xs={12}>
																<TextField
																	fullWidth
																	label='Service name'
																	name='serviceName'
																	onChange={props.handleChange(serviceName)}
																	value={addOnService.serviceName}
																	required
																	size='small'
																	variant='outlined'
																	helperText={
																		addOnService.serviceName !== '' && errorServiceName
																			? errorServiceName
																			: ''
																	}
																	error={Boolean(
																		addOnService.serviceName !== '' && errorServiceName
																	)}
																/>
															</Grid>

															<Grid item md={4} xs={12}>
																<TextField
																	fullWidth
																	label='Enter description'
																	name='description'
																	onChange={props.handleChange(description)}
																	value={addOnService.description}
																	required
																	size='small'
																	variant='outlined'
																	helperText={
																		addOnService.description !== '' && errorDescription
																			? errorDescription
																			: ''
																	}
																	error={Boolean(
																		addOnService.description !== '' && errorDescription
																	)}
																/>
															</Grid>
															<Grid item md={2} xs={12}>
																<TextField
																	fullWidth
																	label='Price'
																	name='price'
																	onChange={props.handleChange(price)}
																	value={addOnService.price}
																	size='small'
																	variant='outlined'
																	InputProps={{
																		startAdornment: (
																			<InputAdornment position='start'>$</InputAdornment>
																		)
																	}}
																	helperText={
																		addOnService.price !== '' && errorPrice ? errorPrice : ''
																	}
																	error={Boolean(addOnService.price !== '' && errorPrice)}
																>
																	Price
																</TextField>
															</Grid>
															{index < 1 ? null : (
																<Grid item md={2} xs={12}>
																	<IconButton
																		style={{ padding: '5px' }}
																		onClick={() => arrayHelpers.remove(index)}
																		data-test='removeAddOnButton'
																	>
																		<HighlightOffIcon fontSize='large' style={{ color: 'red' }} />
																	</IconButton>
																</Grid>
															)}
														</Grid>
														<Divider variant='middle' className={classes.divider} />
													</React.Fragment>
												);
											})}
											<Grid container spacing={2}>
												<Grid item md={4} xs={12}>
													<Button
														variant='contained'
														color='primary'
														startIcon={<AddCircleIcon />}
														disabled={
															!props.values.addOnServices[0].serviceName ||
															!props.values.addOnServices[0].description ||
															!props.values.addOnServices[0].price ||
															Object.keys(props.errors).length !== 0
														}
														onClick={() =>
															arrayHelpers.push({
																serviceName: '',
																description: '',
																price: ''
															})
														}
													>
														Add More
													</Button>
												</Grid>
											</Grid>
										</div>
									)}
								/>
							</CardContent>
							<Divider variant='middle' className={classes.divider} />
							<CardActions className={classes.cardAction}>
								<Grid style={{ display: 'flex', justifyContent: 'center', left: '50%' }}>
									<Button
										disabled={activeStep === 0}
										onClick={() => handleBack(props.values)}
										className={classes.button1}
										variant='contained'
										color='default'
									>
										Back
									</Button>
									<Button
										variant='contained'
										color='primary'
										className={classes.button}
										type='submit'
										disabled={
											!props.values.addOnServices[0].serviceName ||
											!props.values.addOnServices[0].description ||
											!props.values.addOnServices[0].price ||
											Object.keys(props.errors).length !== 0
										}
									>
										{isLastStep ? 'Add Accommodation' : 'Next'}
									</Button>
								</Grid>
							</CardActions>
						</Form>
					);
				}}
			</Formik>
		</Card>
	);
});
export default AddOnServiceForm;
