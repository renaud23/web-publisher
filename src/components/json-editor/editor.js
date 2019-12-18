import React, { useContext } from "react";
import AceEditor from "react-ace";
import { WPContext } from "../web-publisher";
import "./editor.scss";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

export default ({ onChange = () => null, onChangeAnnotation = () => null }) => {
  const { editorContent } = useContext(WPContext);

  return (
    <div className="editor">
      <AceEditor
        placeholder="Placeholder Text"
        mode="json"
        theme="monokai"
        name="blah2"
        onLoad={editor => {
          editor.focus();
          editor.getSession().setUseWrapMode(false);
          editor.getSession().on("changeAnnotation", () => {
            onChangeAnnotation(
              editor.getValue(),
              editor.getSession().getAnnotations()
            );
          });
          editor
            .getSession()
            .on("change", action => onChange(action, editor.getValue()));
        }}
        onChange={(...args) => {}}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={editorContent}
        // setOptions={{
        //   enableBasicAutocompletion: true,
        //   enableLiveAutocompletion: false,
        //   enableSnippets: false,
        //   showLineNumbers: true,
        //   tabSize: 2
        // }}
      />
    </div>
  );
};
