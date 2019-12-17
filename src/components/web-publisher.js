import React, { useEffect, useState } from "react";
import { Panel } from "./editor";
import GLOBAL_LISTENER from "utils/global-listeners";
import { JsonEditor as Editor } from "jsoneditor-react";
import Ajv from "ajv";
import * as lunatic from "@inseefr/lunatic";
import "./web-publisher.scss";
import "jsoneditor-react/es/editor.min.css";

const ajv = new Ajv({ allErrors: true, verbose: true });

const prepareComponents = (questionnaire = {}) => {
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

export default () => {
  const [init, setInit] = useState(false);
  const [source, setSource] = useState(undefined);
  const [questionnaire, setQuestionnaire] = useState(
    lunatic.mergeQuestionnaireAndData(source)({})
  );
  useEffect(() => {
    if (!init) {
      setInit(true);
      fetch("/questionnaire.json")
        .then(res => res.json())
        .then(json => {
          setSource(json);
          setQuestionnaire(lunatic.mergeQuestionnaireAndData(json)({}));
        });
      GLOBAL_LISTENER.start();
      return () => {
        if (init) {
          GLOBAL_LISTENER.clean();
        }
      };
    }
  }, [init, source]);

  return (
    <div className="web-publisher">
      <Panel className="editor-panel" top={50} left={100}>
        <div className="editor">
          <Editor
            value={source}
            ajv={ajv}
            onChange={source => {
              setQuestionnaire(lunatic.mergeQuestionnaireAndData(source)({}));
              setSource(source);
            }}
          />
        </div>
      </Panel>

      <Panel top={50} right={500}>
        <p className="second-panel-right">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse
        </p>
      </Panel>
      <form className="formulaire">{prepareComponents(questionnaire)}</form>
    </div>
  );
};
