"use client";
import React, { useState } from "react";
import Button from "./ui/Button";
import BackGroundSquares from "./ui/Squares";
import Image from "next/image";
import shutterImg from "@/public/CameraShutter.png";
import placeholderImg from "@/public/ImagePlaceHolder.png";
import ConfirmationBox from "./ui/ConfirmationBox";
import DiamondIcon from "@/public/DiamondIcon.svg";

type boxes = "scan" | "upload"

const AnalysisModule = () => {

	const [ConfirmationActive, setConfirmationActive] = useState<
		[boxes | null, boxes | null]
	>([null, null]);

	function activateConfirmationBox(boxToOpen: boxes) {
		setConfirmationActive(prev => [boxToOpen, prev[0]])
	}


	return (
		<>
			<div className="h-full flex px-[32px] py-8 justify-center items-center">
				<div className="h-full w-[40%] relative flex items-center justify-center">
					<BackGroundSquares
						size={"w-[250px] h-[250px]"}
						borderStyle="solid"
						speed={150}
						speedGap={20}
						classnames=""
					/>
					<button
						className="h-[90px] w-[90px] flex items-center justify-center p-1 border border-black rounded-full overflow-hidden transition-all duration-300 hover:h-[75px] hover:w-[75px] active:h-[65px] active:w-[65px]"
						onClick={() => activateConfirmationBox("scan")}>
						<Image src={shutterImg} alt="Let ai scan your face" />
					</button>
					<div className="absolute z-[-1]">
						<p className="uppercase text-sm translate-x-[185px] translate-y-[-95px] opacity-[70%]">
							Allow A.I. <br /> to scan your face
						</p>
					</div>
					<div className="absolute rotate-[-135deg] flex justify-center items-center">
						<div className="absulute h-[100px] w-0 border-l-[1px] border-black origin-bottom translate-y-[95px]"></div>
						<div className="absolute h-[5px] w-[5px] border border-black rounded-full translate-y-[147px]"></div>
					</div>
				</div>

				<div className="h-full w-[20%] flex items-center flex-col justify-between">
					<div className="flex items-start justify-center">
						<ConfirmationBox
							active={ConfirmationActive}
							boxName="scan"
							closeButtonText="ok"
							classNames="absolute h-[125px]"
							closeFunction={() => setConfirmationActive([null, "scan"])}>
							<div className="w-full h-full p-3">
								<p className="text-white text-[16px] uppercase tracking-wider">
									this feature has not been implamented yet
								</p>
							</div>
						</ConfirmationBox>
						<ConfirmationBox
							active={ConfirmationActive}
							boxName={"upload"}
							button1Text="upload"
							closeButtonText="cancel"
							classNames="absolute h-[300px]"
							closeFunction={() => setConfirmationActive([null, "upload"])}>
							<div className="w-full h-full">
								<div className="border-b border-b-white pl-3 p-2">
									<p className="text-white tracking-wider uppercase text-sm">
										Please ensure your selfie has:
									</p>
								</div>
								<div className="flex items-start justify-start p-2">
									<Image src={DiamondIcon} alt="bullet point" />
									<div className="pl-2">
										<p className="text-white uppercase tracking-wider">
											Neutral expression
										</p>
										<p className="text-white text-xs tracking-wider opacity-30">
											smiling may distort wrinkles
										</p>
									</div>
								</div>
								<div className="flex items-start justify-start p-2">
									<Image src={DiamondIcon} alt="bullet point" />
									<div className="pl-2">
										<p className="text-white uppercase tracking-wider">
											frontal pose
										</p>
										<p className="text-white text-xs tracking-wider opacity-30">
											take the image from an arm's length away at eye level
										</p>
									</div>
								</div>
								<div className="flex items-start justify-start p-2">
									<Image src={DiamondIcon} alt="bullet point" />
									<div className="pl-2">
										<p className="text-white uppercase tracking-wider">
											adequate lighting
										</p>
										<p className="text-white text-xs tracking-wider opacity-30">
											avoid harsh downlighting and aim for natural or soft light
										</p>
									</div>
								</div>
							</div>
						</ConfirmationBox>
					</div>
					<div className="flex items-center justify-end flex-col">
						<div className="flex justify-center items-center relative flex-col">
							<div className="relative flex justify-center items-center rotate-45">
								<div className="h-[50px] w-[50px] border border-black absolute opacity-30"></div>
								<div className="h-[60px] w-[60px] border border-black absolute opacity-30"></div>
								<div className="absolute rotate-0">
									<div className="w-0 h-3 border border-black origin-bottom translate-y-[35px] opacity-30"></div>
								</div>
								<div className="absolute rotate-90">
									<div className="w-0 h-3 border border-black origin-bottom translate-y-[35px] opacity-30"></div>
								</div>
								<div className="absolute rotate-180">
									<div className="w-0 h-3 border border-black origin-bottom translate-y-[35px] opacity-30"></div>
								</div>
								<div className="absolute rotate-[270deg]">
									<div className="w-0 h-3 border border-black origin-bottom translate-y-[35px] opacity-30"></div>
								</div>
								<div className="absolute h-[5px] w-[5px] border border-black bg-black opacity-60"></div>
							</div>
							<p className="relative translate-y-11 opacity-50 uppercase">
								Select Prefered Way
							</p>
						</div>
					</div>
				</div>

				<div className="h-full w-[40%] relative flex items-center justify-center">
					<BackGroundSquares
						size={"w-[250px] h-[250px]"}
						borderStyle="solid"
						speed={150}
						speedGap={20}
						classnames=""
					/>
					<button
						className="h-[90px] w-[90px] flex items-center justify-center p-1 border border-black rounded-full overflow-hidden transition-all duration-300 hover:h-[75px] hover:w-[75px] active:h-[65px] active:w-[65px]"
						onClick={() => activateConfirmationBox("upload")}>
						<Image src={placeholderImg} alt="Upload your face" />
					</button>
					<div className="absolute z-[-1]">
						<p className="uppercase text-right text-sm translate-x-[-155px] translate-y-[125px] opacity-[70%]">
							Allow A.I. <br /> Access to <br />
							gallery
						</p>
					</div>
					<div className="absolute rotate-45 flex justify-center items-center">
						<div className="absulute h-[100px] w-0 border-l-[1px] border-black origin-bottom translate-y-[95px]"></div>
						<div className="absolute h-[5px] w-[5px] border border-black rounded-full translate-y-[147px]"></div>
					</div>
				</div>
			</div>
			<Button
				classnames="absolute bottom-0 left-0"
				title={"Back"}
				arrowSide="left"
				clickFunction={() => {}}
			/>
		</>
	);
};

export default AnalysisModule;
