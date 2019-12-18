import React, { useContext } from "react";
import AppContext from "components/web-publisher/context";
import classnames from "classnames";
import "./errors.scss";

const ConsoleErrors = () => {
  const { errors, warnings } = useContext(AppContext);

  return (
    <div className="wp-console-errors">
      {errors.length || warnings.length ? (
        <ul className="wp-errors">
          {errors.map((err, i) => (
            <li className="wp-error" key={`error${i}`}>
              <span className="text">{err.text}</span>
              <span className="row">{`row: ${err.row}`}</span>
              <span className="column">{`column: ${err.column}`}</span>
            </li>
          ))}
          {warnings.map((warn, i) => (
            <li className="wp-warnings" key={`warn${i}`}>
              <span className="text">{warn}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className={classnames(["wp-no-error", "noselect"])}>
          The weather is fine!
        </div>
      )}
    </div>
  );
};

export default ConsoleErrors;
