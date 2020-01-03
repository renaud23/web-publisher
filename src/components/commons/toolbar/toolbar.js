import React from "react";
// import PropTypes from "prop-types";
import "./toolbar.scss";

const Toolbar = ({ children }) => {
  return (
    <div className="wp-json-editor-toolbar" onMouseOver={() => {}}>
      {children}
    </div>
  );
};
Toolbar.propTypes = {};

Toolbar.defaultProps = {};

export default Toolbar;
