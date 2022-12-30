import React from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/img/arrow-right.svg";
import play from "../assets/img/play.svg";


const Intro = () => {
    return (
        <div className="w-full font-inter text-darkBlack lg:text-dark">
            <h1 className="text-[35px] lg:text-[65px] font-normal leading-[120%] tracking-[-0.05em] mb-4">
                Subscribe to FGN Saving Bond
            </h1>
            <p className="opacity-80 text-[16px] lg:text-[28px] tracking-tight mb-16">
                Loan and get paid with interest
            </p>
            <div className="w-full flex gap-8 items-center">
                <Link to={"/bond-offer"}>
                    <button className="font-normal flex items-center gap-2 text-sm lg:text-xl text-white bg-primary py-4 border 
                        border-primary rounded-[5px] px-4 lg:px-6"
                    >
                        <span>Get Started</span>
                        <img src={ arrow } alt="arrow" className="w-[16px] lg:w-[24px]" />
                    </button>
                </Link>
                <Link to="#">
                    <div className="flex items-center gap-2">
                        <div className="circle w-8 border-2 border-darkFaded flex items-center justify-center">
                            <img src={ play } alt="play" className="w-[15px]" />
                        </div>
                        <p className="font-mono text-darkFaded text-sm lg:text-xl font-semibold">See Video</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Intro