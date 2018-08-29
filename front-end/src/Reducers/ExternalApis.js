const initialState = {
  project: "",
  team: [],
  trello: {
    members: [],
    todo: [],
    inProgress: [],
    complete: []
  },
  totalCards: 0,
  completeness: Math.PI * (2 * 199),
  initBars: false,
  countUp: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_PROJECT_DATA":
      const { project, team, trello, totalCards, inProgress } = action;
      return Object.assign({}, state, {
        project,
        team,
        trello,
        totalCards,
        inProgress
      });
    case "ANIMATE_DASHBOARD":
      const { completeness } = action;
      return Object.assign({}, state, {
        completeness,
        initBars: true,
        countUp: true
      });
    case "ERROR":
      return Object.assign({}, state, { error: true });
    default:
      return state;
  }
};
