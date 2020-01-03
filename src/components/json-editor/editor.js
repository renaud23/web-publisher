import React, { useContext } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import { WPContext } from "../web-publisher";
import Toolbar from "./toolbar";
import * as actions from "components/web-publisher/actions";
import "./editor.scss";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
let EDITOR;

const Editor = ({
  onChange = () => null,
  onError = () => null,
  width,
  height
}) => {
  const { editorContent, sourceHash, contentHash, dispatch } = useContext(
    WPContext
  );
  return (
    <div className="editor" id="editor">
      <Toolbar
        refreshable={sourceHash !== contentHash}
        refresh={() => {
          console.log("coucou", editorContent);
          dispatch(actions.setSource(JSON.parse(editorContent), contentHash));
        }}
      />
      <AceEditor
        placeholder="Placeholder Text"
        mode="json"
        theme="monokai"
        name="web-publisher"
        onLoad={editor => {
          editor.focus();
          editor.getSession().setUseWrapMode(false);
          EDITOR = editor;
          editor.getSession().on("changeAnnotation", () => {
            const errors = editor.getSession().getAnnotations();
            if (errors.length) {
              onError(errors);
            }
          });
        }}
        fontSize={14}
        width={`${width}px`}
        height={`${height}px`}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={editorContent}
        onChange={() => {
          onChange(EDITOR.getValue());
        }}
        setOptions={{ fontFamily: "monospace" }}
      />
    </div>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number
};

Editor.defaultProps = {
  onChange: () => null,
  onError: () => null,
  width: 640,
  height: 480
};

export default Editor;
