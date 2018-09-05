const initialState = {
	classes: [], 
	createError: false,
	userName: '',
	userEmail: '',
	subscribed: false,
	subscriptionDate: null
}

export default (state=initialState, action) => {
	switch(action.type) {
		case 'CREATE_CLASS':
			return Object.assign({}, state, { classes: [...state.classes, action.newClass ] });
		case 'UPDATE_CLASS_PAYLOAD':
			return Object.assign({}, state, { classes: action.classes });
		case 'GET_USER_INFO':
			const { userName, userEmail, subscribed, subscriptionDate } = action; 
			return Object.assign({}, state, { userName, userEmail, subscribed, subscriptionDate });
		case 'UPDATE_USER_INFO':
			return Object.assign({}, state, action.user);
		case 'RESET_STATE':
			return Object.assign({}, state, initialState);
		default:
			return state;
	}
}