import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paper: {
		margin: theme.spacing(0, 2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	cards: {
		maxWidth: 350,
		paddingBottom: '10px',
		margin: 'auto',
	},
	cardTitle: {
		marginTop: 10,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	messages: {
		marginTop: '15px',
	},
}));

export default useStyles;
