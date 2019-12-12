import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './panel.scss';

export default ({ children }) => {
	const [ opened, setOpened ] = useState(false);
	useEffect(() => {
		// document.addEventListener(onmouse);
		return () => {};
	});
	return (
		<div className="wp-panel">
			<div className="wp-panel-container">
				<div
					className={classnames('wp-panel-button', { 'wp-panel-opened': opened })}
					onClick={(e) => {
						e.stopPropagation();
						setOpened(!opened);
					}}
				/>
				<div
					className={classnames('wp-panel-transition', {
						'wp-panel-opened': opened,
						'wp-panel-opened': !opened
					})}
				>
					{opened ? children : null}
				</div>
			</div>
		</div>
	);
};
