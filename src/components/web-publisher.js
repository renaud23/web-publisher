import React, { useEffect, useState } from "react";
import { Panel } from "./editor";
import GLOBAL_LISTENER from "utils/global-listeners";
import { JsonEditor as Editor } from "jsoneditor-react";
import "./web-publisher.scss";
import "jsoneditor-react/es/editor.min.css";

export default () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (!init) {
      setInit(true);
      GLOBAL_LISTENER.start();
      return () => {
        if (init) {
          GLOBAL_LISTENER.clean();
        }
      };
    }
  }, [init]);

  return (
    <div className="web-publisher">
      <Panel top={50} left={50}>
        <div className="example">
          <Editor value={{ hello: "hello" }} onChange={() => null} />
        </div>
      </Panel>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?
      </p>
    </div>
  );
};
