import React, { useEffect, useReducer } from "react";
import classnames from "classnames";
import reducer, { initial } from "./reducer";
import { Panel } from "../commons";
import JsonEditor from "../json-editor";
import browserSource from "./tools/browse-source";
import validateSource from "./tools/validate-source";
import * as actions from "./actions";
import GLOBAL_LISTENER from "utils/global-listeners";
import AppContext from "./context";
import ConsoleErrors from "components/console-errors";

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
            onError={err => {
              dispatch(actions.setErrors(err));
            }}
            onChange={content => {
              dispatch(actions.setEditorContent(content));
              try {
                const src = JSON.parse(content);
                dispatch(actions.setSource(src));
                dispatch(actions.setWarnings(validateSource(src)));
                dispatch(actions.setErrors());
              } catch (e) {}
            }}
          />
        </Panel>
        <Panel className="wp-console-errors-panel" top={250} left={100}>
          <ConsoleErrors />
        </Panel>
        <div className={classnames(["wp-content", "noselect"])}>
          {errors.length ? <div>errors !</div> : browserSource(source)}
        </div>
      </div>
    </AppContext.Provider>
  );
};
