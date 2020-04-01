import React from 'react';
import { Bar } from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative'
	},
	chart: {
		padding: theme.spacing(4, 2, 0, 2),
		height: '350px'
	}
}));

const Chart = props => {
	const { data: dataProp, labels } = props;

	const classes = useStyles();
	const theme = useTheme();

	const data = {
		datasets: [
			{
				label: 'Times',
				backgroundColor: theme.palette.primary.main,
				data: dataProp
			}
		],
		labels
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		animation: false,
		cornerRadius: 20,
		legend: {
			display: false
		},
		layout: {
			padding: 0
		},
		scales: {
			xAxes: [
				{
					barThickness: 12,
					maxBarThickness: 10,
					barPercentage: 0.5,
					categoryPercentage: 0.5,
					gridLines: {
						display: false,
						drawBorder: false
					},
					ticks: {
						padding: 20,
						fontColor: theme.palette.text.secondary
					}
				}
			],
			yAxes: [
				{
					gridLines: {
						borderDash: [2],
						borderDashOffset: [2],
						color: theme.palette.divider,
						drawBorder: false,
						zeroLineBorderDash: [2],
						zeroLineBorderDashOffset: [2],
						zeroLineColor: theme.palette.divider
					},
					ticks: {
						padding: 20,
						fontColor: theme.palette.text.secondary,
						beginAtZero: true,
						min: 0,
						maxTicksLimit: 5,
						callback: value => {
							return value > 0 ? `${value}x` : value;
						}
					}
				}
			]
		}
	};

	return (
		<div className={classes.chart}>
			<Bar data={data} options={options} />
		</div>
	);
};

export default Chart;
