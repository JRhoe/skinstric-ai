"use client";
import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Button from "./ui/Button";
import BackGroundSquares from "./ui/Squares";
import LeaveConfirmation from "./ui/LeaveConfirmation";
import LoadingSquares from "./ui/LoadingSquares";

type Library = any;
const libraries: Library[] = ["places"];

const IntroModule = () => {
	const [locationFormShown, setLocationFormShown] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<{ name: string; location: string }>({
		name: "",
		location: "",
	});

	const errorText = document.getElementById("errorText");
	const proceedButton = document.getElementById("proceedButton");
	const locationInputField = document.getElementById("locationInput");
	const leaveConfirmationCard = document.getElementById(
		"leaveConfirmationCard"
	);

	let error = false;
	let tempNameField = userInfo.name;

	const locationRef = useRef<google.maps.places.Autocomplete>(null);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
		libraries,
	});

	async function sumbitForm() {
		setLoading(true);
		try {
			const response = await fetch(
				"https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
				{
					method: "POST",
					body: JSON.stringify(userInfo),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			console.log(data)
		} catch (error) {
			console.log(error);
		}
	}

	function doProceedAction() {
		if (!error) {
			if (locationFormShown) {
				if (userInfo.location) {
					sumbitForm();
				} else {
					if (errorText) {
						errorText.innerHTML = "SELECT CITY FROM DROPDOWN";
						errorText.className =
							"opacity-100 text-red-600 text-[14px] relative top-[-50px] uppercase";
					}
				}
			} else if (!locationFormShown && tempNameField) {
				setLocationFormShown(true);
				if (errorText) errorText.innerHTML = "CLICK TO TYPE";
				setUserInfo((prev) => ({
					name: tempNameField,
					location: prev.location,
				}));
			}
		}
	}

	function doBackAction() {
		if (locationFormShown) setLocationFormShown(false);
		else {
			if (leaveConfirmationCard) leaveConfirmationCard.style.display = "block";
		}
	}

	function updatePlace() {
		const location: any = locationRef.current?.getPlace();
		setUserInfo((prev) => ({
			name: prev.name,
			location: location?.address_components[0].long_name,
		}));
	}

	return (
		<>
			<LeaveConfirmation />

			{loading ? (
				<LoadingSquares />
			) : (
				<>
					<div className="flex flex-col justify-center items-center p-[24px] relative">
						<BackGroundSquares />

						<p
							id="errorText"
							className={`opacity-40 text-main-black text-[14px] relative top-[-50px] uppercase`}>
							CLICK TO TYPE
						</p>

						<form
							className={`flex justify-center absolute h-60px ${
								locationFormShown ? "opacity-0 z-0" : "opacity-100 z-10"
							}`}
							onSubmit={(e) => {
								e.preventDefault();
								doProceedAction();
							}}>
							<input
								placeholder="Introduce yourself"
								id="nameInput"
								className={`placeholder-main-black 
                    focus:placeholder-opacity-0 text-center text-[60px] tracking-tighter px-[8px] focus:outline-none 
                    border-b-2 border-black border-opacity-50 w-[500px] bg-transparent`}
								onFocus={() => {
									if (!error && tempNameField === "")
										if (errorText) errorText.innerHTML = "INTRODUCE YOURSELF";
								}}
								onBlur={() => {
									if (!error && tempNameField === "")
										if (errorText) errorText.innerHTML = "CLICK TO TYPE";
								}}
								onChange={(e) => {
									tempNameField = e.target.value;
									//form validation
									if (!/^[a-zA-Z\s]+$/.test(e.target.value)) {
										//if theres a number or special characters change the error text
										if (errorText) {
											errorText.className =
												"opacity-100 text-red-600 text-[14px] relative top-[-50px] uppercase";
											errorText.innerHTML = "No numbers or special characters";
										}
										error = true;
									} else {
										//if the error gets fixed reset the errortext color
										if (errorText) {
											errorText.className =
												"opacity-40 text-main-black text-[14px] relative top-[-50px] uppercase";
											errorText.innerHTML = "INTRODUCE YOURSELF";
										}
										error = false;
									}

									if (e.target.value === "") {
										if (proceedButton) proceedButton.style.display = "none";
										if (errorText) {
											errorText.className =
												"opacity-40 text-main-black text-[14px] relative top-[-50px] uppercase";
											errorText.innerHTML = "INTRODUCE YOURSELF";
										}
										error = false;
									} else {
										if (proceedButton) proceedButton.style.display = "flex";
									}
								}}
							/>
						</form>

						<form
							className={`flex justify-center absolute h-60px ${
								!locationFormShown ? "opacity-0 z-0" : "opacity-100 z-10"
							}`}
							onSubmit={(e) => {
								e.preventDefault();
								doProceedAction();
							}}>
							{isLoaded && (
								<Autocomplete
									onLoad={(ref) => (locationRef.current = ref)}
									onPlaceChanged={updatePlace}
									options={{ types: ["(cities)"] }}>
									<input
										placeholder={`Where are you from?`}
										id="locationInput"
										className={`placeholder-main-black focus:placeholder-opacity-50 text-center text-[60px]
                            tracking-tighter px-[8px] focus:outline-none border-b-2 border-black border-opacity-50
                            w-[530px] bg-transparent`}
										onFocus={() => {
											if (errorText) {
												errorText.className =
													"opacity-40 text-main-black text-[14px] relative top-[-50px] uppercase";
												errorText.innerHTML = "WHERE ARE YOU FROM?";
											}
											if (locationInputField)
												//@ts-expect-error
												locationInputField.placeholder = "Enter a location";
										}}
										onBlur={() => {
											if (errorText) {
												errorText.className =
													"opacity-40 text-main-black text-[14px] relative top-[-50px] uppercase";
												errorText.innerHTML = "CLICK TO TYPE";
											}
											if (locationInputField)
												//@ts-expect-error
												locationInputField.placeholder = "Where are you from?";
										}}
									/>
								</Autocomplete>
							)}
						</form>
					</div>
					<Button
						classnames="absolute bottom-0 left-0"
						title={"Back"}
						arrowSide="left"
						clickFunction={doBackAction}
					/>
					<Button
						classnames="absolute bottom-[0px] right-[10px] hidden"
						title={"PROCEED"}
						arrowSide="right"
						id="proceedButton"
						clickFunction={doProceedAction}
					/>
				</>
			)}
		</>
	);
};

export default IntroModule;
