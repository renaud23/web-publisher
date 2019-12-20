import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./fab.scss";

const Fab = ({
  onMouseDown,
  onMouseMove,
  onEnter,
  onMouseUp,
  className,
  children
}) => {
  const cls = Array.isArray(className)
    ? ["wp-fab", ...className]
    : ["wp-fab", className];
  return (
    <div
      className={classnames(...cls)}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      tabIndex="0"
      draggable="false"
      onKeyPress={e => {
        if (e.key === "Enter") {
          onEnter(e);
        }
      }}
    >
      <span onDrag={() => null} draggable="false" className="wp-fab-icon">
        {children}
      </span>
    </div>
  );
};

Fab.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func,
  onEnter: PropTypes.func
};

Fab.defaultProps = {
  className: [],
  onCreate: () => null,
  onMouseDown: () => null,
  onMouseMove: () => null,
  onEnter: () => null
};

export default Fab;
