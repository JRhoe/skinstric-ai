import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./ConfirmationBox.module.css";

type confirmationDataType = {
	active: [string | null, string | null];
	boxName: string
	actionButtonText?: string;
	actionButtonFunction?: () => void;
	closeButtonText?: string;
	classNames?: string;
	closeFunction: () => void;
	children?: ReactNode;
};

const ConfirmationBox = ({
	active,
	boxName,
	actionButtonText,
	actionButtonFunction,
	closeButtonText,
	classNames,
	closeFunction,
	children,
}: confirmationDataType) => {
	return (
		<div className={`${classNames} ${active[0] === boxName ? "z-10" : "z-[-10]"}`}>
			<div
				className={`overflow-hidden ${active[0] === boxName ? styles.open : (active[1] === boxName ? styles.closed : "opacity-0 z-[-10]")}`}>
				<div className="w-[100%] h-[calc(100%-40px)] bg-main-black border-b overflow-hidden">
					{children}
				</div>
				<div className="w-[100%] h-[40px] bg-main-black flex justify-end">
					<button
						className="uppercase text-[14px] text-white px-3 tracking-wider opacity-70"
						onClick={(e) => {
							closeFunction();
						}}>
						{closeButtonText}
					</button>
					<button
						className="uppercase text-[14px] text-white px-3 tracking-wider flex items-center justify-center"
						onClick={actionButtonFunction}>
						{actionButtonText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationBox;
