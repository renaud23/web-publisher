import GLOBAL_LISTENER from "utils/global-listeners";
import * as actions from "./actions";

export const initial = {
  init: false,
  source: undefined,
  editorContent: undefined,
  worker: undefined,
  errors: []
};

const reduceInit = state => {
  GLOBAL_LISTENER.start();
  return { ...state, init: true };
};

const reduceSetSource = (state, { payload: { source } }) => ({
  ...state,
  source
});

const reduceSetErrors = (state, { payload: { errors = [] } }) => ({
  ...state,
  errors
});

const reduceSetEditorContent = (state, { payload: { content } }) => ({
  ...state,
  editorContent: content
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
    case actions.SET_ERRORS: {
      return reduceSetErrors(state, action);
    }
    case actions.SET_EDITOR_CONTENT: {
      return reduceSetEditorContent(state, action);
    }
    default:
      return state;
  }
};
