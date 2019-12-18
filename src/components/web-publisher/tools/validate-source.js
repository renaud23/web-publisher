import whiteList from "./white-list";

export const getChildren = value =>
  Object.entries(value).reduce((a, [k, m]) => {
    if (k === "component") {
      return [...a, ...validate(m)];
    }
    if (k === "components") {
      return [...a, ...m.reduce((b, o) => [...b, ...validate(o)], [])];
    }
    return a;
  }, []);

const getWrongAttributes = model => (name, value) =>
  Object.entries(value).reduce((a, [k, v]) => {
    if (!(k in model)) {
      return [...a, `unknow properties ${k} for ${name}`];
    }

    return a;
  }, []);

// const getMissingAttributes = model => (name, value) =>
//   Object.entrie(model).reduce((a, [k, v]) => {
//     // v.isRequired()
//     // v.isIn()
//     // v.compareType()
//     return a;
//   }, []);

/** */
const validateAttribute = (name, value = {}) => {
  if (name in whiteList) {
    if (typeof value !== "object") {
      return [{ text: `${name} value is not object value.`, type: "error" }];
    }
    const model = whiteList[name];
    const wrongAttributes = getWrongAttributes(model)(name, value);
    const children = getChildren(value);

    return [...wrongAttributes, ...children];
  }

  return [];
};

const validate = (source = {}) =>
  Object.entries(source).reduce(
    (a, [k, v]) => [...a, ...validateAttribute(k, v)],
    []
  );

export default validate;
