const initialState = {
	menuClasses: 'menu',
  burgerClasses: 'hamburglar is-open',
  bodyClasses: 'body-container',
  auth: false,
  userID: null,
  authOnLoad: null
}

export default (state=initialState, action) => {
	switch(action.type) {
		case 'TOGGLE_MENU':
			return Object.assign({}, state, { 
				menuClasses: state.menuClasses === 'menu' ? 'menu menu-show' : 'menu',
				burgerClasses: state.burgerClasses === 'hamburglar is-open' ? 'hamburglar is-closed' : 'hamburglar is-open',
				bodyClasses: state.bodyClasses === 'body-container' ? 'body-container shift-left' : 'body-container'
			})
		case 'AUTH':
			return Object.assign({}, state, { auth: true, userID: action.id });
		case 'LOG_OUT':
			return Object.assign({}, state, { auth: false, userID: null });
		case 'STORE_USER_ID':
			return Object.assign({}, state, { userID: action.id });
		case 'AUTH_ON_LOAD':
			const { auth, _id } = action; 
			const newState = auth ? { authOnLoad: auth, auth, userID: _id } : { authOnLoad: auth, auth };
			return Object.assign({}, state, newState);
		default: 
			return state;
	}
}