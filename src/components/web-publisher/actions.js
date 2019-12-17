export const INIT_WP = "wp/init";
export const init = () => ({ type: INIT_WP });

export const SET_SOURCE = "wp/set-source";
export const setSource = source => ({ type: SET_SOURCE, payload: { source } });
