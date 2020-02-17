import queryString from 'query-string';
import Helpers from '../helpers/setAuth.helper';

export default ({ location }) => {
	const { token } = location.search ? queryString.parse(location.search) : queryString.parse(null);
	Helpers.setAuth(token);
	return window.location.assign('/dashboard');
};
