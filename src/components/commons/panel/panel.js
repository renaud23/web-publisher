import React, { useState, useEffect, useCallback, useRef } from "react";
import classnames from "classnames";
import Fab from "../fab";
import GLOBAL_LISTENER from "utils/global-listeners";
import { PlusIcon } from "components/icons";
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
  const [drag, setDrag] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [opened, setOpened] = useState(false);
  const [top, setTop] = useState(topFromProps);
  const [left, setLeft] = useState(leftFromProps || 0);
  const [how, setHow] = useState(undefined);
  const containerEl = useRef();

  const cally = useCallback(
    (eventName, e) => {
      if (eventName === "mousemove" && drag && how) {
        setLeft(e.clientX + how.left);
        setTop(e.clientY + how.top);
      } else if (eventName === "mouseup") {
        e.stopPropagation();
        setDrag(false);
      }
    },
    [drag, how]
  );

  const onBack = useCallback(() => {
    setZindex(0);
  }, []);
  GLOBALS[id] = onBack;

  useEffect(() => () => delete GLOBALS[id], [id]);
  useEffect(() => {
    if (drag) {
      GLOBAL_LISTENER.register(id, cally);
      return () => {
        GLOBAL_LISTENER.remove(id);
      };
    }
    GLOBAL_LISTENER.remove(id);
  }, [drag, cally, id]);

  return (
    <div
      className={classnames(className ? ["wp-panel", className] : "wp-panel")}
      style={{ top, left, zIndex }}
      onMouseDown={() => {
        setZindex(1);
        closeAllOther(id);
      }}
    >
      <div className="wp-panel-container">
        <Fab
          className={classnames("wp-panel-button", {
            "wp-panel-opened": opened,
            "wp-panel-closed": !opened
          })}
          onMouseDown={e => {
            e.stopPropagation();
            setHow({
              left: left - e.clientX,
              top: top - e.clientY
            });
            setMouseDown(true);
            setZindex(1);
            closeAllOther(id);
          }}
          onMouseMove={e => {
            if (mouseDown) {
              setDrag(true);
            }
          }}
          onMouseUp={e => {
            e.stopPropagation();
            setMouseDown(false);
            if (!drag) {
              setOpened(!opened);
            }
            setDrag(false);
          }}
        >
          <PlusIcon />
        </Fab>
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
