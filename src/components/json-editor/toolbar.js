import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSync } from "@fortawesome/free-solid-svg-icons";
import Toolbar, { Item } from "components/commons/toolbar";

const ToolbarEditor = React.memo(({ refreshable, refresh }) => {
  return (
    <Toolbar>
      <Item
        disabled={!refreshable}
        onClick={e => {
          e.stopPropagation();
          refresh();
        }}
      >
        <FontAwesomeIcon icon={faSync} />
      </Item>
    </Toolbar>
  );
});

ToolbarEditor.propTypes = {
  refreshable: PropTypes.bool,
  refresh: PropTypes.func.isRequired
};

ToolbarEditor.defaultProps = {
  refreshable: true
};

export default ToolbarEditor;
