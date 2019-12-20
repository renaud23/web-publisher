import React, { useState, useEffect, useCallback, useRef } from "react";
import classnames from "classnames";
import Fab from "../fab";
import { PlusIcon } from "components/icons";
import Draggable from "../draggable";
import "./panel.scss";

const GLOBALS = {};
const closeAllOther = id => {
  Object.entries(GLOBALS).forEach(([key, cally]) => {
    if (key !== id) cally();
  });
};

export default ({
  children,
  top: topFromProps,
  left: leftFromProps,
  className
}) => {
  const [id] = useState(`wp-panel-${new Date().getMilliseconds()}`);
  const [zIndex, setZindex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [drag, setDrag] = useState(false);
  const [top, setTop] = useState(topFromProps || 0);
  const [left, setLeft] = useState(leftFromProps || 0);
  const containerEl = useRef();

  const onBack = useCallback(() => {
    setZindex(0);
  }, []);
  GLOBALS[id] = onBack;

  useEffect(() => () => delete GLOBALS[id], [id]);

  return (
    <div
      className={classnames(className ? ["wp-panel", className] : "wp-panel")}
    >
      <Draggable
        zIndex={zIndex}
        top={topFromProps}
        left={leftFromProps}
        onDrag={(t, l) => {
          setTop(t);
          setLeft(l);
        }}
        onStartDrag={() => {
          setDrag(true);
        }}
        onStopDrag={() => {
          setDrag(false);
        }}
      >
        <Fab
          className={classnames("wp-panel-button", {
            "wp-panel-opened": opened,
            "wp-panel-closed": !opened
          })}
          onMouseUp={e => {
            if (!drag) {
              setOpened(!opened);
            }
          }}
        >
          <PlusIcon />
        </Fab>
      </Draggable>
      <div
        className="wp-panel-container"
        style={{ top, left, zIndex: 0 }}
        onMouseDown={() => {
          setZindex(1);
          closeAllOther(id);
        }}
      >
        <div
          className={classnames("wp-panel-transition", {
            "wp-panel-opened": opened,
            "wp-panel-closed": !opened
          })}
          ref={containerEl}
        >
          {opened ? children : null}
        </div>
      </div>
    </div>
  );
};
