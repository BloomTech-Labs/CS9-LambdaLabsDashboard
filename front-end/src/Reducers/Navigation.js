const initialState = {
	menuClasses: 'menu',
  burgerClasses: 'hamburglar is-open',
  bodyClasses: 'body-container',
  auth: localStorage.getItem('token') ? localStorage.getItem('token') : false
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
			localStorage.setItem('token', action.token);
			return Object.assign({}, state, { auth: action.token });
		case 'LOG_OUT':
			localStorage.removeItem('token');
			return Object.assign({}, state, { auth: false });
		default: 
			return state;
	}
}