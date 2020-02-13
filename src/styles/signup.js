import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
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
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.dark,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	social: {
		padding: '8px',
		margin: 0,
	},
	googleIcon: {
		border: '1px solid red',
		margin: '5px',
		padding: '10px',
	},
	facebookIcon: {
		border: '1px solid #3b5998',
		margin: '5px',
		padding: '10px',
		height: '40px',
		width: '40px',
	},
	typo: {
		fontSize: '14px',
	},
}));
