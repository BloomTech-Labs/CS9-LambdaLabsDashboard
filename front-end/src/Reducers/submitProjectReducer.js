const initialState = [];

const submitProjectReducer = (state = initialState, action) => {
  // console.log("?===>", action.type);
  switch (action.type) {
    case "projectId":
      return (state = [action.payload]);
    default:
      return state;
  }
};

export { submitProjectReducer };
