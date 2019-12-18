export const INIT_WP = "wp/init";
export const init = args => ({ type: INIT_WP });

export const SET_SOURCE = "wp/set-source";
export const setSource = source => ({ type: SET_SOURCE, payload: { source } });

export const SET_EDITOR_CONTENT = "wp/set-editor-content";
export const setEditorContent = content => ({
  type: SET_EDITOR_CONTENT,
  payload: { content }
});

export const SET_ERRORS = "wp/set-errors";
export const setErrors = errors => ({ type: SET_ERRORS, payload: { errors } });

export const SET_WARNINGS = "wp/set-warnings";
export const setWarnings = (warnings = []) => ({
  type: SET_WARNINGS,
  payload: { warnings }
});
