import React from "react";

interface squareProps {
	size:string
	speed:number
	speedGap:number
	borderStyle: "dashed" | "solid"
	classnames: string
}

const BackGroundSquares = ({size, borderStyle, speed, speedGap, classnames}: squareProps) => {
	classnames += `absolute z-[-1] border border-${borderStyle} border-black animate-spin will-change-transform`
	return (
		<div className={`absolute z-[-1] ${size} flex items-center justify-center rotate-45`}>
			<div
				className={`h-[100%] w-[100%] border-opacity-15 ${classnames}`}
				style={{ animationDuration: `${speed}s` }}></div>
			<div
				className={`h-[110%] w-[110%] border-opacity-10 ${classnames}`}
				style={{ animationDuration: `${speed-speedGap}s` }}></div>
			<div
				className={`h-[120%] w-[120%] border-opacity-5 ${classnames}`}
				style={{ animationDuration: `${speed-(speedGap*2)}s` }}></div>
		</div>
	);
};

export default BackGroundSquares;
