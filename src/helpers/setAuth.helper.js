class Helpers {
	static setAuth(token) {
		if (localStorage.token) {
			localStorage.removeItem('token');
			localStorage.setItem('token', token);
		} else {
			localStorage.setItem('token', token);
		}
	}

	static setUSer(user) {
		if (localStorage.getItem('user')) {
			localStorage.removeItem('user');
			localStorage.setItem('user', user.email);
		} else {
			localStorage.setItem('user', user.email);
		}
	}
}
export default Helpers;
