class Helpers {
	static setAuth(token, user) {
		if (localStorage.token && localStorage.user) {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
		}
	}
}
export default Helpers;
