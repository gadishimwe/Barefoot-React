import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Grid,
	Card,
	CardContent,
	CardHeader,
	Divider,
	CardActions,
	Button,
	Chip
} from '@material-ui/core';
import 'regenerator-runtime/runtime';
import ChipInput from 'material-ui-chip-input';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
	chip: {
		margin: theme.spacing(3, 0)
	},
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
	input: {
		display: 'none'
	},
	cardAction: {
		display: 'block'
	},
	centered: {
		display: 'flex',
		justifyContent: 'center'
	}
}));

const AmenitiesForm = allProps => {
	const { formValues, activeStep, handleBack, handleNext, isLastStep } = allProps;
	const classes = useStyles();
	const amenitiesSchema = yup.object().shape({
		amenities: yup.array().of(
			yup.object().shape({
				amenity: yup
					.string()
					.min(2, 'Amenity must be at least 2 characters')
					.required('Amenity is a required field')
			})
		)
	});

	const handleAdd = (chip, props) => {
		const exist = props.values.amenities.filter(e => e.amenity === chip).length > 0;
		if (exist) {
			return props.values.amenities;
		}
		let completeAmenity;
		if (typeof chip === 'string') {
			completeAmenity = [...props.values.amenities, { amenity: chip }];
		} else {
			completeAmenity = [...props.values.amenities, chip];
		}
		props.setFieldValue(
			'amenities',
			completeAmenity.filter(e => e.amenity !== '')
		);
		return completeAmenity;
	};

	return (
		<Card>
			<CardHeader title='Add accommodation amenities' />
			<Formik
				initialValues={{
					amenities: formValues.amenities
				}}
				validationSchema={amenitiesSchema}
				onSubmit={values => {
					handleNext(values, isLastStep ? 'ready' : 'notReady');
				}}
			>
				{props => (
					<Form>
						<CardContent>
							<Grid container spacing={4}>
								<Grid item md={6} xs={12} className={classes.chip}>
									<ChipInput
										value={props.values.amenities}
										fullWidth
										size='small'
										label='Amenities'
										name='amenities'
										variant='outlined'
										helperText='Enter service name and click enter'
										onDelete={deletedChip =>
											props.setFieldValue(
												'amenities',
												props.values.amenities.filter(e => e !== deletedChip)
											)
										}
										onAdd={chip => handleAdd(chip, props)}
										chipRenderer={({ value, handleDelete, className }, key) => {
											let amenityValue;
											if (typeof value === 'string') {
												amenityValue = { amenity: value };
											} else {
												amenityValue = value;
											}
											if (amenityValue.amenity !== '') {
												return (
													<Chip
														key={key}
														className={className}
														onDelete={handleDelete}
														label={amenityValue.amenity}
													/>
												);
											}
										}}
									/>
								</Grid>
							</Grid>
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
										props.values.amenities[0].amenity === '' ||
										Object.keys(props.errors).length !== 0
									}
								>
									{isLastStep ? 'Add Accommodation' : 'Next'}
								</Button>
							</Grid>
						</CardActions>
					</Form>
				)}
			</Formik>
		</Card>
	);
};
export default AmenitiesForm;
