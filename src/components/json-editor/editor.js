import React, { useContext } from "react";
import AceEditor from "react-ace";
import { WPContext } from "../web-publisher";
import "./editor.scss";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
let EDITOR;
export default ({ onChange = () => null, onChangeAnnotation = () => null }) => {
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
        }}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={editorContent}
        onChange={(...arg) => {
          console.log(arg);
          onChange(EDITOR.getValue(), EDITOR.getSession().getAnnotations());
        }}
      />
    </div>
  );
};
