import whiteList from "./white-list";

/** */
const validateAttribute = (name, value = {}) => {
  if (name in whiteList) {
    if (typeof value !== "object") {
      return [{ text: `${name} value is not object value.`, type: "error" }];
    }
    const model = whiteList[name];
    const wrongType = Object.entries(value).reduce((a, [k, v]) => {
      if (!(k in model)) {
        return [...a, `unknow properties ${k} for ${name}`];
      }

      return a;
    }, []);

    return [...wrongType];
  }

  return [];
};

const validate = (source = {}) => {};

export default validate;
