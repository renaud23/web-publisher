export const INIT_WP = "wp/init";
export const init = args => ({ type: INIT_WP });

export const SET_SOURCE = "wp/set-source";
export const setSource = (source, hash) => ({
  type: SET_SOURCE,
  payload: { source, hash }
});

export const SET_EDITOR_CONTENT = "wp/set-editor-content";
export const setEditorContent = (content, hash) => ({
  type: SET_EDITOR_CONTENT,
  payload: { content, hash }
});

export const SET_ERRORS = "wp/set-errors";
export const setErrors = errors => ({ type: SET_ERRORS, payload: { errors } });

export const SET_WARNINGS = "wp/set-warnings";
export const setWarnings = (warnings = []) => ({
  type: SET_WARNINGS,
  payload: { warnings }
});

export const SET_EDITOR_SIZE = "wp/set-editor-size";
export const setEditorSize = (width, height) => ({
  type: SET_EDITOR_SIZE,
  payload: { width, height }
});
