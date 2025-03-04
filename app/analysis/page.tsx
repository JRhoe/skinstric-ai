import AnalysisModule from "@/components/AnalysisModule";
import React from "react";

const Page = () => {
	return (
		<div className="p-[32px] h-[calc(100vh-64px)] flex flex-col relative justify-between">
			<div>
				<p className="uppercase font-roobertSemiBold text-main-black">
					To start analysis
				</p>
			</div>
			<AnalysisModule />
			<div className="h-[128px]"></div>
		</div>
	);
};

export default Page;
