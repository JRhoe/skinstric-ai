import React from 'react';
import leftArrow from "@/public/FilledArrowLeft.svg"
import rightArrow from "@/public/FilledArrowRight.svg"
import Image from 'next/image';
import styles from "./Button.module.css"

type buttonProps = {
    title: string,
    arrowSide: "left" | "right"
    classnames?: string
    clickFunction: () => void
    id?:string
}

const Button = ({title, arrowSide, classnames, clickFunction, id}: buttonProps) => {
    
    return (
        <div id={id} className={`flex items-center justify-center w-[150px] h-[100px] ${classnames}`} >
            <button className={`${styles.button} flex justify-between items-center relative`} onClick={() => clickFunction()}>
                {arrowSide === "left" && 
                <div className={`${styles.outer} border border-black rotate-45 will-change-transform`}>
                    <div className={`${styles.inner} will-change-transform`}>
                        <Image src={leftArrow} alt='leftArrow' className='rotate-[-45deg]'/>
                    </div>
                </div>}
                <p className={`${styles.text} ${arrowSide === "left" ? "ml-[24px]" : "mr-[24px]"} uppercase text-[14px] font-roobertSemiBold`}>{title}</p>
                {arrowSide === "right" && 
                    <div className={`${styles.outer} border border-black rotate-45 will-change-transform`}>
                    <div className={`${styles.inner} will-change-transform`}>
                        <Image src={rightArrow} alt='rightArrow' className='rotate-[-45deg]'/>
                    </div>
                </div>}
            </button>
        </div>
    );
}

export default Button;
