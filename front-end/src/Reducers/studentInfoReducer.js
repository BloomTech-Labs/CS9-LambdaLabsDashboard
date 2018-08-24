const initialState = {
  studentTrelloInfo: "",
  studentGithubInfo: ""
};

const studentInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "studentInfo":
      return (state = Object.assign({}, state, {
        studentTrelloInfo: action.payload
      }));
    case "studentGithubInfo":
      return (state = Object.assign({}, state, {
        studentGithubInfo: action.payload
      }));
    default:
      return state;
  }
};

export { studentInfoReducer };
