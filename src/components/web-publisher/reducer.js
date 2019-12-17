import GLOBAL_LISTENER from "utils/global-listeners";
import * as actions from "./actions";

export const initial = { init: false, source: undefined };

const reduceInit = state => {
  GLOBAL_LISTENER.start();
  return { ...state, init: true };
};

const reduceSetSource = (state, { payload: { source } }) => ({
  ...state,
  source
});

export default (state, action) => {
  const { type } = action;
  switch (type) {
    case actions.INIT_WP: {
      return reduceInit(state);
    }
    case actions.SET_SOURCE: {
      return reduceSetSource(state, action);
    }
    default:
      return state;
  }
};
