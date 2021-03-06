import React from "react";

function Icon({ width = 20, height = 20, color = "rgba(50,50,50,0.65)" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      enableBackground="new 0 0 242.133 242.133"
      version="1.1"
      viewBox="0 0 242.133 242.133"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M89.247 131.673l-47.732 47.73-15.909-15.91A15 15 0 000 174.1v53.032c0 8.284 6.716 15 15 15l53.033.001a.06.06 0 01.019 0c8.285 0 15-6.716 15-15 0-4.377-1.875-8.316-4.865-11.059l-15.458-15.458 47.73-47.729c5.858-5.858 5.858-15.355 0-21.213-5.856-5.859-15.355-5.858-21.212-.001zM227.133 0H174.1a15 15 0 00-10.606 25.607l15.911 15.911-47.729 47.73c-5.858 5.858-5.858 15.355 0 21.213a14.953 14.953 0 0010.606 4.393c3.839 0 7.678-1.464 10.606-4.394l47.73-47.73 15.909 15.91a14.994 14.994 0 0016.346 3.252 15.001 15.001 0 009.26-13.858V15c0-8.284-6.716-15-15-15z"
      ></path>
    </svg>
  );
}

export default Icon;
