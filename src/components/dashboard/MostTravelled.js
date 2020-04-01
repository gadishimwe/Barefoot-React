import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import Chart from './Chart';
import http from '../../services/httpService';

const useStyles = makeStyles(() => ({
	root: {
		height: '100%'
	},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 700
	}
}));

const MostTravelled = () => {
	const classes = useStyles();
	const [labels, setLabels] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		let mounted = true;

		const fetchProjects = () => {
			http.get(`/api/trips/destinations/most-traveled`).then(response => {
				if (mounted) {
					const countries = response.data.data.map(x => x.country);
					const counts = response.data.data.map(x => x.count);
					setLabels(countries);
					setData(counts);
				}
			});
		};

		fetchProjects();

		return () => {
			mounted = false;
		};
	}, []);

	return (
		<Card>
			<CardHeader title='Most traveled' />
			<Divider />
			<CardContent className={classes.content}>
				<div className={classes.inner}>
					<Chart data={data} labels={labels} />
				</div>
			</CardContent>
		</Card>
	);
};

export default MostTravelled;
