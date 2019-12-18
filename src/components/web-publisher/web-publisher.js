import React, { useEffect, useReducer } from "react";
import reducer, { initial } from "./reducer";
import { Panel } from "../commons";
import JsonEditor from "../json-editor";
import browserSource from "./tools/browse-source";
import validateSource from "./tools/validate-source";
import * as actions from "./actions";
import GLOBAL_LISTENER from "utils/global-listeners";
import AppContext from "./context";
import Errors from "./errors";
import "./web-publisher.scss";

const loadSource = () => fetch("/source.json").then(res => res.json());

const stringifySource = source => JSON.stringify(source, null, "\t");

export default () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const { init, source, errors } = state;
  useEffect(() => {
    if (!init) {
      dispatch(actions.init());
      loadSource().then(src => {
        dispatch(actions.setSource(src));
        dispatch(actions.setEditorContent(stringifySource(src)));
      });
      return () => {
        if (init) {
          GLOBAL_LISTENER.clean();
        }
      };
    }
  }, [init]);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <div className="web-publisher">
        <Panel className="editor-panel" top={50} left={100}>
          <JsonEditor
            onChangeAnnotation={(content, annotations) => {
              if (!annotations.length) {
                const src = JSON.parse(content);
                dispatch(actions.setSource(src));
                dispatch(actions.setEditorContent(content));
                const err = validateSource(src);
                console.log(err);
                dispatch(actions.setErrors(err));
              } else {
                dispatch(actions.setErrors(annotations));
                dispatch(actions.setEditorContent(content));
              }
            }}
          />
        </Panel>
        <div className="wp-content">
          {errors.length ? <Errors /> : browserSource(source)}
        </div>
      </div>
    </AppContext.Provider>
  );
};
