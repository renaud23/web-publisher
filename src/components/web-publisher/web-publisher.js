import React, { useEffect, useReducer } from "react";
import reducer, { initial } from "./reducer";
import { Panel } from "../commons";
import JsonEditor from "../json-editor";
import * as actions from "./actions";
import GLOBAL_LISTENER from "utils/global-listeners";
import AppContext from "./context";
import "./web-publisher.scss";

const loadSource = () => fetch("/questionnaire.json").then(res => res.json());

export default () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const { init, source } = state;
  useEffect(() => {
    if (!init) {
      dispatch(actions.init());
      loadSource().then(source => {
        dispatch(actions.setSource(source));
      });
      return () => {
        if (init) {
          GLOBAL_LISTENER.clean();
        }
      };
    }
  }, [init]);

  return (
    <AppContext.Provider value={{ ...state }}>
      <div className="web-publisher">
        <Panel className="editor-panel" top={50} left={100}>
          <div className="editor">
            <JsonEditor />
          </div>
        </Panel>
        <div className="wp-content"></div>
      </div>
    </AppContext.Provider>
  );
};
