import React from "react";

const LoadingSquares = () => {
	return (
		<div className="flex justify-center items-center h-full">
			<div
				className={`absolute z-[-1] h-[100px] w-[100px] border border-dashed border-black border-opacity-50 rotate-45 animate-ping will-change-transform`}
				style={{ animationDuration: "4s" }}></div>
			<div
				className={`absolute z-[-1] h-[125px] w-[125px] border border-dashed border-black border-opacity-40 rotate-[65deg] animate-ping will-change-transform`}
				style={{ animationDuration: "4s" }}></div>
			<div
				className={`absolute z-[-1] h-[150px] w-[150px] border border-dashed border-black border-opacity-30 rotate-[85deg] animate-ping will-change-transform`}
				style={{ animationDuration: "4s"}}></div>
		</div>
	);
};

export default LoadingSquares;
