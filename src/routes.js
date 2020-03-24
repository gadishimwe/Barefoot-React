/* eslint-disable no-unused-vars */
import React from 'react';
import { Redirect } from 'react-router-dom';

import Signup from './views/Signup';
import finduser from './views/finduser';
import resetpassword from './views/resetpassword';
import success from './views/success';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';
import facebookGoogleService from './services/facebookGoogleService';
import AppLayout from './views/appLayout';
import Settings from './views/SettingsView';
import TripRequests from './views/tripRequestsView';
import Trips from './components/trips/trips';
import ApprovalsTable from './views/approvalsView';
import commentsView from './views/CommentsView';
import RequestDetailsView from './views/requestApprovalDetailsView';
import Accommodations from './components/accommodation/booking/index';
import EditTripView from './views/editTripView';
import AccommodationsView from './views/AccommodationsView';
import Chat from './components/chat/Chat';

const routes = [
	{
		path: '/',
		exact: true,
		component: () => <Redirect to='/signup' />
	},
	{
		path: '/signup',
		exact: true,
		component: Signup
	},
	{
		path: '/login',
		exact: true,
		component: Login
	},
	{
		path: '/facebook/redirect',
		exact: true,
		component: facebookGoogleService
	},
	{
		path: '/google/redirect',
		exact: true,
		component: facebookGoogleService
	},
	{
		path: '/find-user',
		exact: true,
		component: finduser
	},
	{
		path: '/reset-password',
		exact: true,
		component: resetpassword
	},
	{
		path: '/success',
		exact: true,
		component: success
	},
	{
		route: '*',
		component: AppLayout,
		routes: [
			{
				path: '/dashboard',
				exact: true,
				component: Dashboard
			},
			{
				path: '/errors/error-404',
				exact: true,
				component: NotFound
			},
			{
				path: '/settings',
				exact: true,
				component: Settings
			},
			{
				path: '/settings/:tab',
				exact: true,
				component: Settings
			},
			{
				path: '/trips',
				exact: true,
				component: TripRequests
			},
			{
				path: '/trips/:type',
				exact: true,
				component: Trips
			},
			{
				path: '/manager/requests',
				exact: true,
				component: ApprovalsTable
			},
			{
				path: '/comments',
				exact: true,
				component: commentsView
			},
			{
				path: '/manager/request-details',
				exact: true,
				component: RequestDetailsView
			},
			{
				path: '/management/accommodations',
				exact: true,
				component: AccommodationsView
			},
			{
				path: '/accommodations/:tab',
				exact: true,
				component: Accommodations
			},
			{
				path: '/trip/edit',
				exact: true,
				component: EditTripView
			},
			{
				path: '/chat',
				exact: true,
				component: Chat
			},
			{
				component: () => <Redirect to='/errors/error-404' />
			}
		]
	}
];

export default routes;
