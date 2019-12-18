import React, { useContext } from "react";
import AceEditor from "react-ace";
import { WPContext } from "../web-publisher";
import "./editor.scss";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
let EDITOR;
export default ({ onChange = () => null, onError = () => null }) => {
  const { editorContent } = useContext(WPContext);
  return (
    <div className="editor" id="editor">
      <AceEditor
        placeholder="Placeholder Text"
        mode="json"
        theme="monokai"
        name="blah2"
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
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={editorContent}
        onChange={() => {
          onChange(EDITOR.getValue());
        }}
      />
    </div>
  );
};
