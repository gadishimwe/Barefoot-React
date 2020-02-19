const initialState = {
	data: '',
	message: '',
	error: '',
	loading: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_ROLE_PENDING':
			return {
				...state,
			};
		case 'USER_ROLE_FULFILLED':
			return {
				...state,
				data: action.payload.data.data.rows,
			};
		case 'USER_ROLE_REJECTED':
			return {
				...state,
			};
		case 'UPDATE_USER_ROLE_PENDING':
			return {
				...state,
				loading: true,
			};
		case 'UPDATE_USER_ROLE_FULFILLED':
			return {
				...state,
				error: '',
				message: action.payload.data.message,
				loading: false,
			};
		case 'UPDATE_USER_ROLE_REJECTED':
			return {
				...state,
				error: action.payload.response.data.message,
				message: '',
				loading: false,
			};
		default:
			return state;
	}
};

export default userReducer;
