const initialState = [];

const githubDummyDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "gitthubDummyData":
      return (state = [...state, action.payload]);
    default:
      return state;
  }
};
export { githubDummyDataReducer };
