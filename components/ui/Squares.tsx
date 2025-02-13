import React from "react";

const BackGroundSquares = () => {
	return (
		<>
			<div
				className={`absolute z-[-1] h-[500px] w-[500px] border border-dashed border-black border-opacity-30 animate-spin will-change-transform`}
				style={{ animationDuration: "150s" }}></div>
			<div
				className={`absolute z-[-1] h-[525px] w-[525px] border border-dashed border-black border-opacity-20 animate-spin will-change-transform`}
				style={{ animationDuration: "130s" }}></div>
			<div
				className={`absolute z-[-1] h-[550px] w-[550px] border border-dashed border-black border-opacity-10 animate-spin will-change-transform`}
				style={{ animationDuration: "110s" }}></div>
		</>
	);
};

export default BackGroundSquares;
