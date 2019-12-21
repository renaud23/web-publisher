import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Fab from "../fab";
import { PlusIcon, ExpandIcon } from "components/icons";
import Draggable from "../draggable";
import "./panel.scss";

const RESIZER_WIDTH = 20;
const GLOBALS = {};
const callOtherCallbacks = id => {
  Object.entries(GLOBALS).forEach(([key, cally]) => {
    if (key !== id) cally();
  });
};

const Panel = ({
  children,
  resize,
  top: topFromProps,
  left: leftFromProps,
  onResize,
  className
}) => {
  const [id] = useState(`wp-panel-${new Date().getMilliseconds()}`);
  const [zIndex, setZindex] = useState(0);
  const [expand, setExpand] = useState(false);
  const [opened, setOpened] = useState(false);
  const [size, setSize] = useState({ witdh: undefined, height: undefined });
  const [tmpSize, setTmpSize] = useState({
    witdh: undefined,
    height: undefined
  });
  const [drag, setDrag] = useState(false);
  const [top, setTop] = useState(topFromProps || 0);
  const [left, setLeft] = useState(leftFromProps || 0);
  const containerEl = useRef();

  const onBack = useCallback(() => {
    setZindex(0);
  }, []);
  GLOBALS[id] = onBack;

  useEffect(() => () => delete GLOBALS[id], [id]);
  useEffect(() => {
    if (containerEl.current && opened) {
      const { width, height } = containerEl.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [containerEl, setSize, opened]);

  return (
    <div
      className={classnames(className ? ["wp-panel", className] : "wp-panel")}
    >
      <Draggable
        zIndex={zIndex + 1}
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
          onMouseDown={() => {
            callOtherCallbacks(id);
            setZindex(2);
          }}
          onEnter={e => {
            e.stopPropagation();
            setOpened(!opened);
          }}
        >
          <PlusIcon />
        </Fab>
      </Draggable>
      <div
        className={classnames("wp-panel-transition", {
          "wp-panel-opened": opened,
          "wp-panel-closed": !opened
        })}
      >
        {opened ? (
          <div
            className={classnames("wp-panel-container", { expand })}
            ref={containerEl}
            style={{
              top,
              left,
              zIndex,
              width: size.width,
              height: size.height
            }}
            onMouseDown={() => {
              callOtherCallbacks(id);
              setZindex(2);
            }}
          >
            {children}
          </div>
        ) : null}
      </div>
      {expand ? (
        <div
          className="wp-panel-resize-calque"
          style={{
            width: tmpSize.width,
            height: tmpSize.height,
            top,
            left,
            zIndex
          }}
        />
      ) : null}
      {opened && resize ? (
        <Draggable
          top={top - RESIZER_WIDTH + size.height || 0}
          left={left - RESIZER_WIDTH + size.width || 0}
          minTop={top}
          minLeft={left}
          zIndex={zIndex}
          onStartDrag={() => setExpand(true)}
          onDrag={(t, l) => {
            setTmpSize({ width: l - left, height: t - top });
          }}
          onStopDrag={(t, l) => {
            setSize({ width: l - left, height: t - top });
            onResize(l - left, t - top);
            setExpand(false);
          }}
        >
          <Fab className="wp-panel-resize">
            <ExpandIcon width={10} height={10} />
          </Fab>
        </Draggable>
      ) : null}
    </div>
  );
};

Panel.propTypes = {
  onResize: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  resize: PropTypes.bool
};

Panel.defaultProps = {
  onResize: () => null,
  top: 0,
  left: 0,
  className: undefined,
  resize: false
};

export default Panel;
