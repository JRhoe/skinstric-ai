import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./ConfirmationBox.module.css";

type confirmationDataType = {
	active: boolean | null;
	button1Text: string;
	closeButtonText: string;
	classNames?: string;
	closeFunction: () => void;
	children?: ReactNode;
};

const ConfirmationBox = ({
	active,
	button1Text,
	closeButtonText,
	classNames,
	closeFunction,
	children,
}: confirmationDataType) => {
	return (
		<div className={`${classNames} ${active ? "z-10" : "z-[-10]"}`}>
			<div
				className={`overflow-hidden ${active !== null ? (active ? styles.open : styles.closed) : "opacity-0 z-10"}`}>
				<div className="w-[100%] h-[calc(100%-40px)] bg-main-black">
					{children}
				</div>
				<div className="w-[100%] h-[40px] bg-main-black border-t flex justify-end">
					<button
						className="uppercase text-[14px] text-white px-3 tracking-wider opacity-70"
						onClick={(e) => {
							closeFunction();
						}}>
						{closeButtonText}
					</button>
					<Link
						href="/"
						className="uppercase text-[14px] text-white px-3 tracking-wider flex items-center justify-center">
						{button1Text}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationBox;
