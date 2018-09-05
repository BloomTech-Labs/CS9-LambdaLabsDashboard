import Axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

export const createProject = newProject => {
	return { type: 'CREATE_PROJECT', newProject };
}

export const createClass = newClass => {
	return { type: 'CREATE_CLASS', newClass};
}

export const updateClassPayload = classes => {
	return { type: 'UPDATE_CLASS_PAYLOAD', classes };
}

export const getClasses = userID => {
	return (dispatch, getState) => {
		Axios.get(`${baseURL}/classes/${getState().Navigation.userID}`)
			.then(res => {
				if(typeof res.data === 'string') {

				} else {
					dispatch(updateClassPayload(res.data.classes));
				}
			})
	}
}

export const getUserInfo = userID => {
	return (dispatch, getState) => {
		Axios.get(`${baseURL}/users/${getState().Navigation.userID}`)
			.then(res => {
				const { data } = res;
				if(typeof data === 'string') {

				} else {
					const { userName, userEmail, subscribed, subscriptionDate } = data;
					dispatch({ type: 'GET_USER_INFO', userName, userEmail, subscribed, subscriptionDate })
				}
			})
	}
}

export const updateUserInfo = user => {
	return { type: 'UPDATE_USER_INFO', user };
}

export const resetUserData = () => {
	return { type: 'RESET_STATE' };
}