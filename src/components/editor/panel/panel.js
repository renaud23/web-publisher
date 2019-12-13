import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import GLOBAL_LISTENER from "utils/global-listeners";
import "./panel.scss";

export default ({
  children,
  top: topFromProps = 0,
  left: leftFromProps = 0
}) => {
  const [drag, setDrag] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [opened, setOpened] = useState(false);
  const [top, setTop] = useState(topFromProps);
  const [left, setLeft] = useState(leftFromProps);
  const [how, setHow] = useState(undefined);

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
  useEffect(() => {
    const id = `wp-panel-${new Date().getMilliseconds()}`;
    if (drag) {
      GLOBAL_LISTENER.register(id, cally);
      return () => {
        GLOBAL_LISTENER.remove(id);
      };
    }
    GLOBAL_LISTENER.remove(id);
  }, [drag, cally]);

  return (
    <div className="wp-panel" style={{ top, left }}>
      <div className="wp-panel-container">
        <div
          className={classnames("wp-panel-button", {
            "wp-panel-opened": opened
          })}
          onMouseDown={e => {
            e.stopPropagation();
            setHow({ left: left - e.clientX, top: top - e.clientY });
            setMouseDown(true);
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
        />
        <div
          className={classnames("wp-panel-transition", {
            "wp-panel-opened": opened,
            "wp-panel-closed": !opened
          })}
        >
          {opened ? children : null}
        </div>
      </div>
    </div>
  );
};
