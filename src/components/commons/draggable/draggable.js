import React, { useState, useEffect, useCallback } from "react";
import GLOBAL_LISTENER from "utils/global-listeners";
import "./draggable.scss";

const Draggable = React.memo(
  ({
    children,
    zIndex,
    minTop,
    minLeft,
    top: topFromProps,
    left: leftFromProps,
    onStartDrag,
    onStopDrag,
    onDrag
  }) => {
    const [id] = useState(`wp-draggable-${new Date().getMilliseconds()}`);
    const [drag, setDrag] = useState(false);
    const [top, setTop] = useState(topFromProps || 0);
    const [left, setLeft] = useState(leftFromProps || 0);
    const [down, setDown] = useState(false);
    const [how, setHow] = useState(undefined);
    const cally = useCallback(
      (eventName, e) => {
        if (eventName === "mousemove" && drag && how) {
          setTop(Math.max(e.clientY + how.top, minTop || 0));
          setLeft(Math.max(e.clientX + how.left, minLeft || 0));
          onDrag(e.clientY + how.top, e.clientX + how.left);
        } else if (eventName === "mouseup") {
          e.stopPropagation();
          setDrag(false);
          setDown(false);
        }
      },
      [drag, how, onDrag, minTop, minLeft]
    );
    useEffect(() => {
      setTop(topFromProps);
      setLeft(leftFromProps);
    }, [topFromProps, leftFromProps]);
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
      <span
        className="wp-draggable"
        tabIndex="-1"
        onMouseDown={e => {
          e.stopPropagation();
          setDown(true);
          setHow({
            left: left - e.clientX,
            top: top - e.clientY
          });
        }}
        onMouseUp={e => {
          e.stopPropagation();
          if (drag) {
            onStopDrag(e.clientY + how.top, left);
          }
          setDown(false);
          setDrag(false);
        }}
        onMouseMove={e => {
          e.stopPropagation();
          if (down && !drag) {
            onStartDrag(top, left);
            setDrag(true);
          }
        }}
        style={{ top, left, zIndex }}
      >
        {children}
      </span>
    );
  }
);

Draggable.defaultProps = {
  top: 0,
  left: 0,
  zIndex: 0,
  onStartDrag: () => null,
  onStopDrag: () => null,
  onDrag: () => null
};

export default Draggable;
