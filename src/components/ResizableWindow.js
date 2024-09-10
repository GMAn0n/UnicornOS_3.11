import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import './ResizableWindow.css';

export function ResizableWindow({ title, onClose, appName, children, initialWidth, initialHeight, isFullscreenOnMobile = true }) {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [windowSize, setWindowSize] = useState({ width: initialWidth, height: initialHeight });

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const windowStyle = isMobile && isFullscreenOnMobile
		? { width: '100%', height: 'calc(100% - 40px)', position: 'fixed', top: 40, left: 0 }
		: windowSize;

	return (
		<Draggable handle=".window-header" disabled={isMobile && isFullscreenOnMobile}>
			<Resizable
				size={windowStyle}
				onResizeStop={(e, direction, ref, d) => {
					setWindowSize(prevSize => ({
						width: prevSize.width + d.width,
						height: prevSize.height + d.height
					}));
				}}
				minWidth={200}
				minHeight={100}
				bounds="window"
				enable={{
					top: !isMobile,
					right: !isMobile,
					bottom: !isMobile,
					left: !isMobile,
					topRight: !isMobile,
					bottomRight: !isMobile,
					bottomLeft: !isMobile,
					topLeft: !isMobile
				}}
			>
				<div className={`window ${appName}`} style={{ zIndex: 1200 }}>
					<div className="window-header">
						<span>{title}</span>
						<button className="close-button" onClick={onClose}>×</button>
					</div>
					<div className="window-content">
						{typeof children === 'function' ? children(windowSize) : children}
					</div>
				</div>
			</Resizable>
		</Draggable>
	);
}
