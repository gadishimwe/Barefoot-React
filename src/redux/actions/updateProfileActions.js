/* eslint-disable import/prefer-default-export */
import http from '../../helpers/httpService';
import { UPDATE_PROFILE } from './actionTypes';

export const updateProfile = ({
	gender,
	residence,
	preferredLanguage: language,
	preferredCurrency: currency,
	birthDate,
	profilePicture: image,
}) => dispatch => {
	dispatch({
		type: UPDATE_PROFILE,
		payload: http.patch('/api/users/edit-profile', {
			gender,
			residence,
			preferredLanguage: language,
			preferredCurrency: currency,
			birthDate,
			profilePicture: image,
		}),
	});
};
