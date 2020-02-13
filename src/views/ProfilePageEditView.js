/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfilePageEdit from '../components/ProfilePageEdit';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}));
export default function ProfilePage() {
	const classes = useStyles();
	return (
		<>
			<ProfilePageEdit />
		</>
	);
}
