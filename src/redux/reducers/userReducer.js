const initialState = {
	data: '',
	managerData: '',
	message: '',
	error: '',
	loading: false
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_ROLE_PENDING':
			return {
				...state
			};
		case 'USER_ROLE_FULFILLED':
			return {
				...state,
				data: action.payload.data.data.rows
			};
		case 'USER_ROLE_REJECTED':
			return {
				...state
			};
		case 'UPDATE_USER_ROLE_PENDING':
			return {
				...state,
				loading: true
			};
		case 'UPDATE_USER_ROLE_FULFILLED':
			return {
				...state,
				error: '',
				message: action.payload.data.message,
				loading: false
			};
		case 'UPDATE_USER_ROLE_REJECTED':
			return {
				...state,
				error: action.payload.response.data.message,
				message: '',
				loading: false
			};
		case 'GET_MANAGERS_PENDING':
			return {
				...state
			};
		case 'GET_MANAGERS_FULFILLED':
			return {
				...state,
				managerData: action.payload.data.data.rows
			};
		case 'GET_MANAGERS_REJECTED':
			return {
				...state
			};
		case 'ASSIGN_MANAGER_PENDING':
			return {
				...state,
				loading: true
			};
		case 'ASSIGN_MANAGER_FULFILLED':
			return {
				...state,
				error: '',
				message: action.payload.data.message,
				loading: false
			};
		case 'ASSIGN_MANAGER_REJECTED':
			return {
				...state,
				error: action.payload.response.data.message[0],
				message: '',
				loading: false
			};
		default:
			return state;
	}
};

export default userReducer;
