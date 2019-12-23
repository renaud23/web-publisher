import React from "react";
import * as lunatic from "@inseefr/lunatic";

export default (questionnaire = {}) => {
  if (!questionnaire.components) return [];
  return questionnaire.components.map(q => {
    const { id, componentType } = q;
    const Component = lunatic[componentType];
    if (!Component)
      return (
        <h4
          key={`component-${id}`}
        >{`${id} component type is not supported`}</h4>
      );
    return (
      <div className="lunatic lunatic-component" key={`component-${id}`}>
        <Component {...q} handleChange={() => null} labelPosition="TOP" />
      </div>
    );
  });
};
