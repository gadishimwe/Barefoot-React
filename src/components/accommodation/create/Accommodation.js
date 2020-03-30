import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Divider, colors, Stepper, Step, StepLabel, Paper, Grid } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import Header from '../../common/SettingsHeader';
import AccommodationForm from './AccommodationForm';
import RoomsForm from './RoomsForm';
import AddOnServiceForm from './AddOnServiceForm';
import AmenitiesForm from './AmenitiesForm';
import createAccommodation from '../../../redux/actions/createAccommodationsAction';

const useStyles = makeStyles(theme => ({
	divider: {
		backgroundColor: colors.grey[300],
		marginBottom: '1%'
	},
	content: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	root: {
		width: '100%'
	},
	button: {
		width: 300,
		marginBottom: theme.spacing(1)
	},
	button1: {
		width: 300,
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	loader: {
		color: 'white'
	}
}));

const AccommodationComponent = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [isReady, setIsReady] = React.useState(false);
	const [formValues, setFormValues] = React.useState({
		name: '',
		typeId: 1,
		locationId: '',
		rating: 0,
		description: '',
		accommodationPictures: [
			{
				imageUrl: '',
				subjectType: ''
			}
		],
		addOnServices: [
			{
				serviceName: '',
				description: '',
				price: ''
			}
		],
		amenities: [{ amenity: '' }],
		rooms: [
			{
				roomType: '',
				numberOfPeople: '',
				roomPictures: [
					{
						imageUrl: '',
						subjectType: ''
					}
				],
				roomPrice: '',
				numberOfRooms: ''
			}
		]
	});

	const getSteps = () => {
		return ['Information', 'Add-On Services', 'Amenities', 'Add room'];
	};

	const dispatch = useDispatch();

	const handleNext = (newValues, status) => {
		setFormValues({ ...formValues, ...newValues });
		if (status === 'ready') {
			setIsReady(true);
			return 0;
		}
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = newValues => {
		setFormValues({ ...formValues, ...newValues });
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const steps = getSteps();

	const getStepContent = step => {
		const isLastStep = activeStep === steps.length - 1;
		switch (step) {
			case 0:
				return (
					<AccommodationForm
						formValues={formValues}
						activeStep={activeStep}
						handleBack={handleBack}
						handleNext={handleNext}
						isLastStep={isLastStep}
						test-data='accommodation-form'
					/>
				);
			case 1:
				return (
					<AddOnServiceForm
						formValues={formValues}
						setFormValues={setFormValues}
						activeStep={activeStep}
						handleBack={handleBack}
						handleNext={handleNext}
						isLastStep={isLastStep}
					/>
				);
			case 2:
				return (
					<AmenitiesForm
						formValues={formValues}
						setFormValues={setFormValues}
						activeStep={activeStep}
						handleBack={handleBack}
						handleNext={handleNext}
						isLastStep={isLastStep}
					/>
				);
			case 3:
				return (
					<RoomsForm
						formValues={formValues}
						setFormValues={setFormValues}
						activeStep={activeStep}
						handleBack={handleBack}
						handleNext={handleNext}
						isLastStep={isLastStep}
					/>
				);
			default:
				return 'Unknown step';
		}
	};

	if (isReady) {
		dispatch(createAccommodation(formValues));
		setIsReady(false);
	}

	return (
		<>
			<Header title='Accommodation' subtitle='Add new Accommodations' />
			<Divider className={classes.divider} />
			<div className={classes.root}>
				<Stepper activeStep={activeStep} component={Paper}>
					{steps.map(label => {
						const stepProps = {};
						const labelProps = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<Grid className={classes.content} test-data='steps'>
					{getStepContent(activeStep)}
				</Grid>
			</div>
		</>
	);
};

export default AccommodationComponent;
