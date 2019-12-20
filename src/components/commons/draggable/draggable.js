import React, { useState, useEffect, useCallback } from 'react';
import GLOBAL_LISTENER from 'utils/global-listeners';
import './draggable.scss';

const Draggable = ({ children, top: topFromProps, left: leftFromProps, onStartDrag, onStopDrag, onDrag }) => {
	const [id] = useState(`wp-draggable-${new Date().getMilliseconds()}`);
	const [drag, setDrag] = useState(false);
	const [top, setTop] = useState(topFromProps || 0);
	const [left, setLeft] = useState(leftFromProps || 0);
	const [down, setDown] = useState(false);
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
			onMouseDown={(e) => {
				e.stopPropagation();
				setDown(true)
				setHow({
					left: left - e.clientX,
					top: top - e.clientY
				});
			}}
			onMouseUp={(e) => {
				e.stopPropagation();
				if (drag) {
					onStopDrag(top, left)
				}
				setDown(false);
				setDrag(false);
			}}
			onMouseMove={() => {
				if (down && !drag) {
					onStartDrag(top, left)
					setDrag(true);
				} else if (drag) {
					onDrag(top, left)
				}
			}}
			style={{ top, left }}
		>
			{children}
		</span>
	);
};

Draggable.defaultProps = { top: 0, left: 0, onStartDrag: () => null, onStopDrag: () => null, onDrag: () => null };

export default Draggable;
