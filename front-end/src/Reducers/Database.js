const initialState = {
	classes: [], 
	createError: false
}

export default (state=initialState, action) => {
	switch(action.type) {
		case 'CREATE_CLASS':
			return Object.assign({}, state, { classes: [...state.classes, action.newClass ] });
		case 'UPDATE_CLASS_PAYLOAD':
			return Object.assign({}, state, { classes: action.classes });
		default:
			return state;
	}
}