import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Item = React.memo(({ onClick, disabled, children }) => {
  return (
    <span
      className={classnames("item", { disabled })}
      onClick={e => {
        if (!disabled && typeof onClick === "function") onClick(e);
      }}
    >
      {children}
    </span>
  );
});
Item.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Item.defaultProps = { disabled: false };

export default Item;
