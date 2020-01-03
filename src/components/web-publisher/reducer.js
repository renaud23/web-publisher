import GLOBAL_LISTENER from "utils/global-listeners";
import * as actions from "./actions";

export const initial = {
  init: false,
  source: undefined, // JSON for Lunatic
  editorContent: undefined, // String fro JSON editor
  contentHash: undefined,
  sourceHash: undefined,
  errors: [],
  warnings: [],
  editorSize: { witdh: 250, height: 500 }
};

const reduceInit = state => {
  GLOBAL_LISTENER.start();
  return { ...state, init: true };
};

const reduceSetSource = (state, { payload: { source, hash } }) => ({
  ...state,
  source,
  sourceHash: hash
});

const reduceSetErrors = (state, { payload: { errors = [] } }) => ({
  ...state,
  errors
});

const reduceSetEditorContent = (state, { payload: { content, hash } }) => {
  return {
    ...state,
    editorContent: content,
    contentHash: hash
  };
};

const reduceSetWarnings = (state, { payload: { warnings } }) => ({
  ...state,
  warnings
});

const reduceSetEdirtorSize = (state, { payload: { width, height } }) => ({
  ...state,
  editorSize: { width, height }
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
    case actions.SET_WARNINGS: {
      return reduceSetWarnings(state, action);
    }
    case actions.SET_EDITOR_SIZE: {
      return reduceSetEdirtorSize(state, action);
    }

    default:
      return state;
  }
};
