"use client"
import { useRef, useEffect } from 'react';
import * as React from 'react';

function useOutsideAlerter(ref, closeBox, selectRef) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target) && !selectRef.current?.contains(event.target)) {
				closeBox(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
}

export default function ClickOutSide({ className, children, closeBox, selectRef ,style}) {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, closeBox, selectRef || null);

	return (
		<div
			ref={wrapperRef}
			className={className}
			style={style}
		>
			{children}
		</div>
	);
}
