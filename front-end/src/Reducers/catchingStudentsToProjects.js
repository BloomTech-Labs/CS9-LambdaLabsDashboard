import { NULL } from "graphql/language/kinds";

const initialState = [];

const catchingStudents = (state = initialState, action) => {
  switch (action.type) {
    case "databaseStudents":
      if (action.payload !== undefined || action.payload !== null) {
        return (state = [...action.payload]);
      }

    default:
      return state;
  }
};
export { catchingStudents };
