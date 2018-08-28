
export const createProject = newProject => {
	return { type: 'CREATE_PROJECT', newProject };
}

export const createClass = newClass => {
	return { type: 'CREATE_CLASS', newClass};
}

export const updateClassPayload = classes => {
	return { type: 'UPDATE_CLASS_PAYLOAD', classes };
}