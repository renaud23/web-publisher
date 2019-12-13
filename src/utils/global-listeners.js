const REGISTRED_CALLBACKS = {};
const GL = {};

const onMouseMove = e => {
  Object.values(REGISTRED_CALLBACKS).forEach(callback => {
    callback("mousemove", e);
  });
};

const onMouseUp = e => {
  Object.values(REGISTRED_CALLBACKS).forEach(callback => {
    callback("mouseup", e);
  });
};

export const register = (id, callback) => {
  if (id && typeof callback === "function") {
    REGISTRED_CALLBACKS[id] = callback;
  }
};

export const remove = id => {
  if (id in REGISTRED_CALLBACKS) {
    delete REGISTRED_CALLBACKS[id];
  }
};

export const start = () => {
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

export const clean = () => {
  document.removeEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

GL.start = start;
GL.clean = clean;
GL.remove = remove;
GL.register = register;

export default GL;
