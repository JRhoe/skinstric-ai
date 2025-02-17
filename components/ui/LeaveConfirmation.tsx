"use client"
import Link from "next/link";
import React, { useEffect } from "react";

const LeaveConfirmation = () => {
	let leaveConfirmationCard: HTMLElement | null;

	useEffect(() => {
		leaveConfirmationCard = document.getElementById("leaveConfirmationCard");
	}, []);

	return (
		<div
			id="leaveConfirmationCard"
			className="border border-black w-[400px] h-[125px] absolute hidden">
			<div className="w-[100%] h-[70%] bg-main-black p-3">
				<p className="text-white text-[16px] uppercase tracking-wider">
					You are about to leave analysis.
				</p>
				<p className="text-white text-[16px] uppercase tracking-wider">
					Are you sure?
				</p>
			</div>
			<div className="w-[100%] h-[30%] bg-main-black border-t flex justify-end">
				<Link
					href="/"
					className="uppercase text-[14px] text-white px-3 tracking-wider opacity-70 flex items-center justify-center">
					Leave
				</Link>
				<button
					className="uppercase text-[14px] text-white px-3 tracking-wider"
					onClick={() => {
						if (leaveConfirmationCard)
							leaveConfirmationCard.style.display = "none";
					}}>
					Stay
				</button>
			</div>
		</div>
	);
};

export default LeaveConfirmation;
