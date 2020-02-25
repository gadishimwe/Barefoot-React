import queryString from 'query-string';
import axios from 'axios';

const token = queryString.parse(window.location.search);
export default axios.create({
	baseURL: `${process.env.API_URL}`,
	headers: {
		authorization: token.token,
		'Access-Control-Allow-Origin': '*',
		contentType: 'application/json',
		accept: 'application/json'
	}
});
