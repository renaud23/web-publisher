import React from "react";

import * as componentsAPI from "components-api";

const whiteList = {
  Paragraphe: { contenu: "" },
  Paragraphes: { paragraphe: [] }
};

/** */
const Whity = ({ name, children, ...rest }) => {
  if (name in componentsAPI) {
    const Component = componentsAPI[name];
    return <Component {...rest}>{children}</Component>;
  }
  return null;
};

const getProps = value =>
  Object.entries(value).reduce(
    (a, [k, m]) =>
      k !== "component" && k !== "components" ? { ...a, [k]: m } : a,
    {}
  );

const getChildren = value =>
  Object.entries(value).reduce((a, [k, m]) => {
    if (k === "component") {
      return [...a, ...browserSource(m)];
    }
    if (k === "components") {
      return [...a, ...m.map(o => browserSource(o))];
    }
    return a;
  }, []);

/** */
const browserSource = (source = {}) =>
  Object.entries(source).reduce((a, [name, value], i) => {
    const children = [...a];
    if (name in whiteList) {
      return [
        ...a,
        <Whity key={`${name}${i}`} name={name} {...getProps(value)}>
          {getChildren(value)}
        </Whity>
      ];
    }
    return children;
  }, []);

export default browserSource;
