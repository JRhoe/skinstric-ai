"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import Button from './ui/Button';
import Squares from './ui/Squares';
import Link from 'next/link';

type Library = any;
const libraries:Library[] = ["places"]

const IntroModule = () => {
    const [showLocation, setShowLocation] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<{name: string, location: string}>({name: "", location: ""})
    const errorText = document.getElementById("errorText")
    const proceedButton = document.getElementById("proceedButton")
    const locationInputField = document.getElementById("locationInput")
    const backCard = document.getElementById("backCard")
    let error = false
    let introName = userInfo.name
    let location: any
    let locationRef = useRef<google.maps.places.Autocomplete>(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries,
    })

    function sumbitForm() {
        if (!showLocation && !error && introName){
            setShowLocation(true)
            if(errorText) errorText.innerHTML = "CLICK TO TYPE"
            setUserInfo((prev) => ({name: introName, location: prev.location}))
        }
    }

    function back() {
        if (showLocation) setShowLocation(false)
        else {if (backCard) backCard.style.display = "block"}
    }

    function updatePlace() {
        location = locationRef.current?.getPlace()
        setUserInfo((prev) => ({name: prev.name, location: location?.address_components[0].long_name}))
    }

    console.log(userInfo)

    useEffect(() => {
        async function sendData() {
            const response = await fetch('https://wk7wmfz7x8.execute-api.us-east-2.amazonaws.com/live/FES_Virtual_Internship_1/level1', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:3000/",
                },
                body: JSON.stringify({name:"John", location:"San Jose"}),
            });
            console.log("test")
        }
        sendData()
    },[])

    return (
        <>
            <div id='backCard' className='border border-black w-[400px] h-[125px] absolute hidden'>
                <div className='w-[100%] h-[70%] bg-main-black p-3'>
                    <p className='text-white text-[16px] uppercase tracking-wider'>You are about to leave analysis.</p>
                    <p className='text-white text-[16px] uppercase tracking-wider'>Are you sure?</p>
                </div>
                <div className='w-[100%] h-[30%] bg-main-black border-t flex justify-end'>
                    <Link href="/" className='uppercase text-[14px] text-white px-3 tracking-wider opacity-70 flex items-center justify-center'>Leave</Link>
                    <button className='uppercase text-[14px] text-white px-3 tracking-wider' onClick={() => {if (backCard) backCard.style.display = "none"}}>Stay</button>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center p-[24px] relative'>

                <Squares/>

                <p id='errorText' className={`opacity-40 text-main-black text-[14px] relative top-[-50px] uppercase`}>CLICK TO TYPE</p>
                
                <form className={`flex justify-center absolute h-60px ${showLocation ? "opacity-0 z-0" : "opacity-100 z-10"}`} onSubmit={e => { 
                    e.preventDefault()
                    sumbitForm()
                    }}>
                    <input placeholder='Introduce yourself' id='nameInput' className={`placeholder-main-black 
                    focus:placeholder-opacity-0 text-center text-[60px] tracking-tighter px-[8px] focus:outline-none 
                    border-b-2 border-black border-opacity-50 w-[500px] bg-transparent`}
                    onFocus={() => {if (!error && introName === "") if(errorText) errorText.innerHTML = "INTRODUCE YOURSELF"}}
                    onBlur={() => {if (!error  && introName === "") if(errorText) errorText.innerHTML = "CLICK TO TYPE"}}
                    onChange={e => {
                        introName = e.target.value
                        //form validation
                        if(!/^[a-zA-Z\s]+$/.test(e.target.value)){
                            //if theres a number or special characters change the error text
                            if (errorText) {
                                errorText.className = "opacity-100 text-red-600 text-[14px] relative top-[-50px] uppercase"
                                errorText.innerHTML = "No numbers or special characters"
                            }
                            error = true
                        } else {
                            //if the error gets fixed reset the errortext color
                            if (errorText) errorText.className = "opacity-40 text-main-black text-[14px] relative top-[-50px] uppercase"
                            error = false
                        }

                        if (e.target.value === "") {
                            if (proceedButton) proceedButton.style.display = "none"
                            if (errorText) errorText.className = "opacity-40 text-main-black text-[14px] relative top-[-50px] uppercase"
                            error = false
                        } else { if (proceedButton) proceedButton.style.display = "flex" }
                        }}/>
                </form>

                <form className={`flex justify-center absolute h-60px ${!showLocation ? "opacity-0 z-0" : "opacity-100 z-10"}`} 
                    onSubmit={e => { 
                        e.preventDefault()
                        sumbitForm()}}>
                    {isLoaded &&
                        <Autocomplete 
                        onLoad={(ref) => locationRef.current = ref}
                        onPlaceChanged={updatePlace}
                        options={{types:["(cities)"]}}>
                            <input 
                            placeholder={`Where are you from?`}
                            id='locationInput'
                            className={`placeholder-main-black focus:placeholder-opacity-50 text-center text-[60px]
                            tracking-tighter px-[8px] focus:outline-none border-b-2 border-black border-opacity-50
                            w-[530px] bg-transparent`}
                            onFocus={() => {
                                if(errorText) errorText.innerHTML = "WHERE ARE YOU FROM?"
                                //@ts-ignore
                                if(locationInputField) locationInputField.placeholder = "Enter a location"
                                }}
                            onBlur={() => {
                                if(errorText) errorText.innerHTML = "CLICK TO TYPE"
                                //@ts-ignore
                                if(locationInputField) locationInputField.placeholder = "Where are you from?"
                                }}
                            />
                        </Autocomplete>
                    }
                </form>
            </div>
            <Button
            classnames="absolute bottom-0 left-0"
            title={"Back"}
            arrowSide='left'
            clickFunction={back}/>
            <Button
            classnames='absolute bottom-[0px] right-[10px] hidden'
            title={"PROCEED"}
            arrowSide='right'
            id="proceedButton"
            clickFunction={sumbitForm}/>
        </>
    );
}

export default IntroModule;