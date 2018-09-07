const initialState = {
	classes: [], 
	createError: false,
	userName: '',
	userEmail: '',
	subscribed: false,
	subscribedDate: null
}

export default (state=initialState, action) => {
	switch(action.type) {
		case 'CREATE_CLASS':
			return Object.assign({}, state, { classes: [...state.classes, action.newClass ] });
		case 'UPDATE_CLASS_PAYLOAD':
			return Object.assign({}, state, { classes: action.classes });
		case 'GET_USER_INFO': {
			const { userName, userEmail, subscribed, subscribedDate } = action; 
			return Object.assign({}, state, { userName, userEmail, subscribed, subscribedDate });
		}
		case 'UPDATE_USER_INFO': {
			const { name, email, subscribed, subscribedDate } = action.user;
			return Object.assign({}, state, { userName: name, userEmail: email, subscribed, subscribedDate });
		}
		case 'RESET_STATE':
			return Object.assign({}, state, initialState);
		default:
			return state;
	}
}