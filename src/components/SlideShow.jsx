import React, { useState } from "react";
import blob1 from "../assets/img/blob5.svg";
import blob2 from "../assets/img/blob6.svg";
import blob3 from "../assets/img/blob7.svg";
import hands from "../assets/img/hands.png";
import angleLeft from "../assets/img/angle-left.svg";
import angleRight from "../assets/img/angle-right.svg";


const SlideShow = () => {
    
    let [currentSlide, setCurrentSlide] = useState(0);

    const slideArray = [blob1, blob2, blob3]

    const prevSlide = () => {
        setCurrentSlide((prevState) => prevState - 1)
    }

    const nextSlide = () => {
        setCurrentSlide((prevState) => prevState + 1)
    }

    return (
        <div className="w-full h-full flex justify-center items-start relative px-4 md:px-8 lg:px-10 xl:px-16">
            <img src={ slideArray[currentSlide] } alt="blob" className="aspect-square w-[800px] lg:w-[650px] mt-0 lg:mt-[-50px]" />
            <div className="absolute w-full h-full flex justify-center items-end z-[2]">
                <img src={ hands } alt="hands" className="h-full z-[2] object-cover" />
            </div>
            <div className="absolute bottom-10 right-4 md:right-8 lg:right-10 xl:right-16 z-[3]">
                <div className="w-full grid grid-cols-[5rem_50px_5rem]">
                    {
                        currentSlide !== 0
                     ?  <img src={ angleLeft } alt="hands" className="w-20 justify-self-start" onClick={ prevSlide } />
                     :  <div></div>
                    }
                    <div className="w-full h-1 justify-self-center"></div>
                    {
                        currentSlide !== 2
                     ?  <img src={ angleRight } alt="hands" className="w-20 justify-self-start" onClick={ nextSlide } />
                     :  <div></div>
                    }
                </div>
                <div className="flex gap-3 justify-center">
                    <div className={`circle w-5 ${currentSlide === 0 ? "bg-black" : "bg-darkFaded"}`} onClick={() => setCurrentSlide(0)}></div>
                    <div className={`circle w-5 ${currentSlide === 1 ? "bg-black" : "bg-darkFaded"}`} onClick={() => setCurrentSlide(1)}></div>
                    <div className={`circle w-5 ${currentSlide === 2 ? "bg-black" : "bg-darkFaded"}`} onClick={() => setCurrentSlide(2)}></div>
                </div>
            </div>
        </div>
    )
}

export default SlideShow