const initialState = [];

const editProjectReducer = (state = initialState, action) => {
  console.log("action===>", action.type);
  switch (action.type) {
    case "editProject":
      if (action.payload !== undefined || action.payload !== null) {
        return (state = [action.payload]);
      }
    default:
      return state;
  }
};

export { editProjectReducer };
