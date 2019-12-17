import React, { useContext } from "react";
import AceEditor from "react-ace";
import { WPContext } from "../web-publisher";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

export default () => {
  const { source } = useContext(WPContext);

  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="json"
      theme="monokai"
      name="blah2"
      onLoad={() => null}
      onChange={() => null}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={JSON.stringify(source, null, "\t")}
      // setOptions={{
      //   enableBasicAutocompletion: true,
      //   enableLiveAutocompletion: false,
      //   enableSnippets: false,
      //   showLineNumbers: true,
      //   tabSize: 2
      // }}
    />
  );
};
